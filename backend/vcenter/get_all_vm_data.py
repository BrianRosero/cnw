import os
from dotenv import load_dotenv
import ssl
import json
from pyVim.connect import SmartConnect, Disconnect
from pyVmomi import vim

load_dotenv()

VCENTER_SERVER = os.getenv("VCENTER_SERVER_GLAKE")
VCENTER_USER = os.getenv("VCENTER_USER_GLAKE")
VCENTER_PASSWORD = os.getenv("VCENTER_PASSWORD_GLAKE")

def serialize(obj, depth=0, max_depth=3):
    if depth > max_depth:
        return str(obj)
    if isinstance(obj, (str, int, float, bool)) or obj is None:
        return obj
    if isinstance(obj, (list, tuple, set)):
        return [serialize(i, depth + 1, max_depth) for i in obj]
    if isinstance(obj, dict):
        return {str(k): serialize(v, depth + 1, max_depth) for k, v in obj.items()}
    if hasattr(obj, '__dict__'):
        result = {}
        for attr in dir(obj):
            if attr.startswith('_') or callable(getattr(obj, attr, None)):
                continue
            try:
                result[attr] = serialize(getattr(obj, attr), depth + 1, max_depth)
            except Exception as e:
                result[attr] = f"Error: {e}"
        return result
    return str(obj)

def get_all_vm_data():
    context = ssl._create_unverified_context()
    si = SmartConnect(host=VCENTER_SERVER, user=VCENTER_USER, pwd=VCENTER_PASSWORD, sslContext=context)
    content = si.RetrieveContent()
    containerView = content.viewManager.CreateContainerView(content.rootFolder, [vim.VirtualMachine], True)
    vms = containerView.view

    all_vm_data = []

    for vm in vms:
        try:
            all_vm_data.append(serialize(vm))
        except Exception as e:
            all_vm_data.append({"error": f"Error serializing VM: {str(e)}"})

    containerView.Destroy()
    Disconnect(si)
    return all_vm_data

if __name__ == "__main__":
    all_data = get_all_vm_data()
    print(json.dumps(all_data))
