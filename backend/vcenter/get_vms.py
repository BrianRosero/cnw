import os
from dotenv import load_dotenv
import json
from pyVim.connect import SmartConnect, Disconnect
from pyVmomi import vim
import ssl

# Cargar variables del archivo .env
load_dotenv()

# Variables de entorno para conexión a vCenter
VCENTER_SERVER = os.getenv("VCENTER_SERVER_GLAKE")
VCENTER_USER = os.getenv("VCENTER_USER_GLAKE")
VCENTER_PASSWORD = os.getenv("VCENTER_PASSWORD_GLAKE")

def get_virtual_machines():
    context = ssl._create_unverified_context()
    si = SmartConnect(host=VCENTER_SERVER, user=VCENTER_USER, pwd=VCENTER_PASSWORD, sslContext=context)
    content = si.content
    container = content.rootFolder
    containerView = content.viewManager.CreateContainerView(container, [vim.VirtualMachine], True)
    vms = containerView.view

    vm_list = []

    for vm in vms:
        try:
            summary = vm.summary
            runtime = summary.runtime
            summary_config = summary.config
            quickStats = summary.quickStats
            guest = vm.guest
            full_config = vm.config

            disk_info_list = []
            total_guest_capacity_gb = 0
            total_guest_free_space_gb = 0

            if guest and guest.disk:
                for disk in guest.disk:
                    if disk.capacity is not None and disk.freeSpace is not None:
                        capacity_gb = disk.capacity / (1024 ** 3)
                        free_space_gb = disk.freeSpace / (1024 ** 3)

                        disk_data = {
                            "diskPath": disk.diskPath,
                            "capacityGB": round(capacity_gb, 2),
                            "freeSpaceGB": round(free_space_gb, 2),
                            "capacityBytes": disk.capacity,
                            "freeSpaceBytes": disk.freeSpace,
                        }
                        disk_info_list.append(disk_data)

                        total_guest_capacity_gb += capacity_gb
                        total_guest_free_space_gb += free_space_gb

            # Discos
            disks = []
            for device in full_config.hardware.device:
                if isinstance(device, vim.vm.device.VirtualDisk):
                    disks.append({
                        "label": device.deviceInfo.label,
                        "capacity_gb": round(device.capacityInKB / (1024 * 1024), 2),
                        "backing_file": device.backing.fileName,
                        "thin_provisioned": getattr(device.backing, 'thinProvisioned', False)
                    })

            # Adaptadores de red
            nics = []
            for device in full_config.hardware.device:
                if isinstance(device, vim.vm.device.VirtualEthernetCard):
                    nics.append({
                        "label": device.deviceInfo.label,
                        "mac_address": device.macAddress,
                        "connected": device.connectable.connected,
                        "network": str(device.deviceInfo.summary)
                    })

            # IPs de red
            ip_addresses = []
            if guest and guest.net:
                for net in guest.net:
                    if net.ipAddress:
                        ip_addresses.extend(net.ipAddress)

            # Información general de la VM
            vm_info = {
                "name": summary_config.name,
                "instance_uuid": summary_config.instanceUuid,
                "bios_uuid": summary_config.uuid,
                "path": summary_config.vmPathName,
                "cpu_cores": full_config.hardware.numCPU,
                "cores_per_socket": getattr(full_config.hardware, 'numCoresPerSocket', None),
                "memory_gb": round(full_config.hardware.memoryMB / 1024, 2),
                "cpu_usage_mhz": quickStats.overallCpuUsage,
                "memory_usage_mb": quickStats.guestMemoryUsage,
                "power_state": str(runtime.powerState),
                "uptime_seconds": quickStats.uptimeSeconds,
                "host": runtime.host.name if runtime.host else "Desconocido",
                "disks": disks,
                "network_adapters": nics,
                "guest_info": {
                    "hostname": guest.hostName,
                    "os_fullname": guest.guestFullName,
                    "ip_addresses": ip_addresses,
                    "tools_status": str(guest.toolsStatus),
                    "tools_version": guest.toolsVersion
                },
                "annotation": summary_config.annotation if summary_config.annotation else "",
                "folder": vm.parent.name if hasattr(vm.parent, 'name') else "Desconocido",
                "guestDiskPartitions": disk_info_list,
                "totalGuestDiskCapacityGB": round(total_guest_capacity_gb, 2),
                "totalGuestDiskFreeSpaceGB": round(total_guest_free_space_gb, 2),
                "totalGuestDiskUsedSpaceGB": round(total_guest_capacity_gb - total_guest_free_space_gb, 2)
            }

            vm_list.append(vm_info)

        except Exception as e:
            vm_list.append({"error": f"Error al procesar VM {vm.name}: {str(e)}"})

    Disconnect(si)
    return vm_list

if __name__ == "__main__":
    vms_info = get_virtual_machines()
    print(json.dumps(vms_info, indent=2, ensure_ascii=False))
