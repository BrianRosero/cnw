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

def get_cluster_hosts():
    context = ssl._create_unverified_context()
    si = SmartConnect(host=VCENTER_SERVER, user=VCENTER_USER, pwd=VCENTER_PASSWORD, sslContext=context)
    content = si.content
    container = content.rootFolder

    # Obtener información de los hosts
    viewType_hosts = [vim.HostSystem]
    containerView_hosts = content.viewManager.CreateContainerView(container, viewType_hosts, True)
    hosts = containerView_hosts.view

    host_list = []
    for host in hosts:
        summary = host.summary
        hardware = summary.hardware
        quickStats = summary.quickStats

        host_info = {
            "name": summary.config.name,
            "cpu_cores": hardware.numCpuCores,
            "cpu_model": hardware.cpuModel,
            "memory_gb": round(hardware.memorySize / 1024 ** 3, 2),
            "cpu_usage_mhz": quickStats.overallCpuUsage,
            "memory_usage_mb": quickStats.overallMemoryUsage,
            "connection_state": summary.runtime.connectionState,
            "power_state": "on" if summary.runtime.powerState == "poweredOn" else "off"
        }
        host_list.append(host_info)

    Disconnect(si)
    return host_list

if __name__ == "__main__":
    # Llamada principal
    hosts_info = get_cluster_hosts()
    print(json.dumps(hosts_info, indent=2))
