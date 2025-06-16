import { useEffect, useState } from "react";

function App() {
  const [vms, setVms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8083/vcenter/vms-all")
      .then((res) => {
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        return res.json();
      })
      .then(({ data }) => {
        console.log("Datos recibidos:", data);
        setVms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar VMs:", err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🔍 Información Completa de VMs</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : vms.length === 0 ? (
        <p>No se encontraron máquinas virtuales.</p>
      ) : (
        <div className="space-y-4">
          {vms.map((vm, idx) => (
            <pre
              key={idx}
              className="bg-gray-100 p-2 rounded text-sm overflow-auto max-h-96"
            >
              {JSON.stringify(vm, null, 2)}
            </pre>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
