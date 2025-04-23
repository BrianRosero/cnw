import { useState, useEffect, useRef } from "react";
import Chart from "react-apexcharts";

const API_URL = "http://192.168.200.155:8083/vcenter/vms-db";

export default function VmTable() {
  const [vmsData, setVmsData] = useState({ dbVms: {}, appVms: {}, otherVms: {} });
  const [loading, setLoading] = useState(true);
  const [selectedVm, setSelectedVm] = useState(null);
  const [chartData, setChartData] = useState({ cpu: [], memory: [], timestamps: [] });

  const MAX_DATA_POINTS = 50;
  const intervalRef = useRef(null);

  const fetchVms = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al obtener datos del backend");

      let data;
      try {
        data = await response.json();
      } catch (error) {
        throw new Error("Error parseando JSON");
      }

      if (!data?.data) throw new Error("Formato de respuesta inesperado");

      const categorizedVms = { dbVms: {}, appVms: {}, otherVms: {} };

      data.data.forEach(vm => {
        if (!vm.name.includes("ESE")) return;

        const category = vm.name.includes("BD") || vm.name.includes("DB") ? "dbVms"
          : vm.name.includes("DA") ? "appVms"
            : "otherVms";

        if (!categorizedVms[category][vm.name]) {
          categorizedVms[category][vm.name] = [];
        }
        categorizedVms[category][vm.name].push(vm);
      });

      // Ordenar los nombres de las VMs dentro de cada categoría
      Object.keys(categorizedVms).forEach(category => {
        categorizedVms[category] = Object.fromEntries(
          Object.entries(categorizedVms[category]).sort(([a], [b]) => a.localeCompare(b))
        );
      });

      setVmsData(categorizedVms);

      if (selectedVm && categorizedVms[selectedVm.type]?.[selectedVm.name]) {
        updateChartData(categorizedVms[selectedVm.type][selectedVm.name]);
      }
    } catch (error) {
      console.error("Error obteniendo las máquinas virtuales:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVms();
    intervalRef.current = setInterval(fetchVms, 10000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (selectedVm && vmsData[selectedVm.type]?.[selectedVm.name]) {
      updateChartData(vmsData[selectedVm.type][selectedVm.name]);
    }
  }, [selectedVm, vmsData]);

  const updateChartData = (history) => {
    if (!history.length) return;

    const sortedHistory = history.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    setChartData({
      timestamps: sortedHistory.map(vm => new Date(vm.timestamp).toLocaleTimeString()).slice(-MAX_DATA_POINTS),
      cpu: sortedHistory.map(vm => vm.cpu_usage_mhz).slice(-MAX_DATA_POINTS),
      memory: sortedHistory.map(vm => vm.memory_usage_mb).slice(-MAX_DATA_POINTS),
    });
  };

  const handleVmClick = (name, vmList, type) => {
    setSelectedVm({ name, type });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Historial de Máquinas Virtuales</h1>
      {loading ? (
        <p className="text-gray-600">Cargando datos...</p>
      ) : (
        <div className="overflow-x-auto">
          {Object.entries(vmsData).map(([category, vms], index) => (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {category === "dbVms" ? "Bases de Datos" : category === "appVms" ? "Aplicativos" : "Otros"}
              </h2>
              {Object.keys(vms).length === 0 ? (
                <p className="text-gray-500">No hay datos disponibles.</p>
              ) : (
                Object.entries(vms).map(([name, vmList]) => (
                  <div key={name} className="mb-6">
                    <h3
                      className="text-lg font-semibold text-gray-600 mb-2 cursor-pointer hover:text-blue-500"
                      onClick={() => handleVmClick(name, vmList, category)}
                    >
                      {name}
                    </h3>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      )}

      {selectedVm && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Detalles de {selectedVm.name}</h2>
          <p>Consumo Actual de CPU: {chartData.cpu.length ? chartData.cpu[chartData.cpu.length - 1] : "N/A"} MHz</p>
          <p>Consumo Actual de Memoria: {chartData.memory.length ? chartData.memory[chartData.memory.length - 1] : "N/A"} MB</p>

          <Chart
            options={{ chart: { type: "line", animations: { enabled: true } }, xaxis: { categories: chartData.timestamps } }}
            series={[{ name: "CPU (MHz)", data: chartData.cpu }]}
            type="line"
            height={200}
          />

          <Chart
            options={{ chart: { type: "line", animations: { enabled: true } }, xaxis: { categories: chartData.timestamps } }}
            series={[{ name: "Memoria (MB)", data: chartData.memory }]}
            type="line"
            height={200}
          />
        </div>
      )}
    </div>
  );
}
