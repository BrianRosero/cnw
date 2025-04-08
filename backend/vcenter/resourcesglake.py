import os
from dotenv import load_dotenv
import json
from pyVim.connect import SmartConnect, Disconnect
from pyVmomi import vim
import ssl

# Cargar variables del archivo .env
load_dotenv()

# Datos de conexión vCenter desde variables de entorno
VCENTER_SERVER = os.getenv("VCENTER_SERVER_GLAKE")
VCENTER_USER = os.getenv("VCENTER_USER_GLAKE")
VCENTER_PASSWORD = os.getenv("VCENTER_PASSWORD_GLAKE")

def get_vcenter_info():
    context = ssl._create_unverified_context()
    si = SmartConnect(host=VCENTER_SERVER, user=VCENTER_USER, pwd=VCENTER_PASSWORD, sslContext=context)
    content = si.content
    container = content.rootFolder

    # Obtener información de los hosts
    viewType_hosts = [vim.HostSystem]
    containerView_hosts = content.viewManager.CreateContainerView(container, viewType_hosts, True)
    hosts = containerView_hosts.view

    total_cpu_cores = 0
    total_cpu_model = set()
    total_memory_size = 0
    total_cpu_usage = 0
    total_memory_usage = 0
    host_details = []

    for host in hosts:
        summary = host.summary
        hardware = summary.hardware

        total_cpu_cores += hardware.numCpuCores
        total_cpu_model.add(hardware.cpuModel)
        total_memory_size += hardware.memorySize

        total_cpu_usage += summary.quickStats.overallCpuUsage or 0
        total_memory_usage += summary.quickStats.overallMemoryUsage or 0

        host_details.append({
            "name": summary.config.name,
            "status": summary.runtime.powerState,
            "cpu_cores": hardware.numCpuCores,
            "memory_gb": round(hardware.memorySize / 1024**3, 2),
            "vm_count": len(host.vm)
        })

    total_cpu_ghz = total_cpu_cores * 2.095  # Suposición de 2.095 GHz por núcleo
    total_memory_size_tb = total_memory_size / 1024 ** 4
    total_memory_usage_tb = total_memory_usage / 1024 ** 2
    total_cpu_usage_percent = (total_cpu_usage / (total_cpu_ghz * 1000)) * 100
    total_memory_usage_percent = (total_memory_usage / (total_memory_size / 1024 ** 2)) * 100

    # Obtener información de las máquinas virtuales
    viewType_vms = [vim.VirtualMachine]
    containerView_vms = content.viewManager.CreateContainerView(container, viewType_vms, True)
    vms = containerView_vms.view

    vm_details = []
    for vm in vms:
        summary = vm.summary
        vm_details.append({
            "name": summary.config.name,
            "status": summary.runtime.powerState,
            "cpu_count": summary.config.numCpu,
            "memory_gb": summary.config.memorySizeMB / 1024,
            "guest_os": summary.config.guestFullName
        })

    # Obtener información de los datastores
    viewType_datastores = [vim.Datastore]
    containerView_datastores = content.viewManager.CreateContainerView(container, viewType_datastores, True)
    datastores = containerView_datastores.view

    total_storage_capacity_gb = 0
    total_storage_used_gb = 0
    total_storage_free_gb = 0
    datastore_details = []

    for datastore in datastores:
        summary = datastore.summary
        capacity_gb = summary.capacity / 1024 ** 3
        free_gb = summary.freeSpace / 1024 ** 3
        used_gb = capacity_gb - free_gb

        total_storage_capacity_gb += capacity_gb
        total_storage_used_gb += used_gb
        total_storage_free_gb += free_gb

        datastore_details.append({
            "name": summary.name,
            "type": summary.type,
            "capacity_tb": round(capacity_gb / 1024, 2),
            "used_tb": round(used_gb / 1024, 2),
            "free_tb": round(free_gb / 1024, 2),
            "usage_percent": round((used_gb / capacity_gb) * 100, 2)
        })

    total_storage_capacity_tb = total_storage_capacity_gb / 1024
    total_storage_used_tb = total_storage_used_gb / 1024
    total_storage_free_tb = total_storage_free_gb / 1024
    total_storage_usage_percent = (total_storage_used_gb / total_storage_capacity_gb) * 100

    # Obtener información de red (switches virtuales)
    viewType_networks = [vim.Network]
    containerView_networks = content.viewManager.CreateContainerView(container, viewType_networks, True)
    networks = containerView_networks.view

    network_details = []
    for network in networks:
        network_details.append({
            "name": network.name
        })

    # Generar salida JSON
    result = {
        "cpu": {
            "cores": total_cpu_cores,
            "total_cpu_ghz": total_cpu_ghz,
            "model": list(total_cpu_model),
            "usage_mhz": total_cpu_usage / 1000,
            "usage_percent": round(total_cpu_usage_percent, 2)
        },
        "memory": {
            "total_tb": round(total_memory_size_tb, 2),
            "used_tb": round(total_memory_usage_tb, 2),
            "usage_percent": round(total_memory_usage_percent, 2)
        },
        "storage": {
            "total_tb": round(total_storage_capacity_tb, 2),
            "used_tb": round(total_storage_used_tb, 2),
            "free_tb": round(total_storage_free_tb, 2),
            "usage_percent": round(total_storage_usage_percent, 2)
        },
        "hosts": host_details,
        "virtual_machines": vm_details,
        "datastores": datastore_details,
        "networks": network_details
    }

    Disconnect(si)
    return result

if __name__ == "__main__":
    # Llamada principal
    info = get_vcenter_info()
    print(json.dumps(info, indent=2))