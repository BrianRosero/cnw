const mongoose = require("mongoose");

const vmSchema = new mongoose.Schema({
      name: { type: String, required: true },
      instance_uuid: { type: String, required: true },
      cpu_usage_mhz: { type: Number, required: true },
      memory_usage_mb: { type: Number, required: true },
      storage_usage_gb: { type: Number, required: true },
      cpu_cores: { type: Number, default: 0 },
      cores_per_socket: { type: Number, default: 0 },
      memory_gb: { type: Number, default: 0 },
      power_state: { type: String, default: "Desconocido" },
      host: { type: String, default: "Desconocido" },
      disks: [
            {
                  name: { type: String, default: "Desconocido" },
                  capacity_gb: { type: Number, default: 0 },
            },
      ],
      guest_info: {
            hostname: { type: String, default: "Desconocido" },
            os_fullname: { type: String, default: "Desconocido" },
            ip_addresses: [{ type: String }],
            tools_status: { type: String, default: "Desconocido" },
            tools_version: { type: String, default: "Desconocido" },
      },
      timestamp: { type: Date, default: Date.now },
});

const VmDataGlake = mongoose.model("VmDataGlake", vmSchema);
module.exports = VmDataGlake;
