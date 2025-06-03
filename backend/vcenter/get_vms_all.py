import os
import json
from dotenv import load_dotenv
from pyVim.connect import SmartConnect, Disconnect
from pyVmomi import vim
import ssl

load_dotenv()

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
            vm_data = {
                "name": vm.name,
                "uuid": vm.config.uuid if vm.config else "N/A",
                "guestOsFullName": vm.summary.guest.guestFullName if vm.summary and vm.summary.guest else "N/A",
            }

            disk_info_list = []
            total_guest_capacity_gb = 0
            total_guest_free_space_gb = 0

            if vm.guest and vm.guest.disk:
                for disk in vm.guest.disk:
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

            vm_data["guestDiskPartitions"] = disk_info_list
            vm_data["totalGuestDiskCapacityGB"] = round(total_guest_capacity_gb, 2)
            vm_data["totalGuestDiskFreeSpaceGB"] = round(total_guest_free_space_gb, 2)
            vm_data["totalGuestDiskUsedSpaceGB"] = round(total_guest_capacity_gb - total_guest_free_space_gb, 2)

            vm_list.append(vm_data)

        except Exception as e:
            vm_list.append({"error": f"Error al procesar VM {vm.name if hasattr(vm, 'name') else 'desconocida'}: {str(e)}"})

    Disconnect(si)
    return vm_list

if __name__ == "__main__":
    vms_info = get_virtual_machines()
    print(json.dumps(vms_info, indent=2, ensure_ascii=False))
