import React, { useState } from 'react';

const clientesSimulados = [
  { id: 1, nombre: 'Cliente A', email: 'clienteA@example.com' },
  { id: 2, nombre: 'Cliente B', email: 'clienteB@example.com' },
  { id: 3, nombre: 'Cliente C', email: 'clienteC@example.com' },
  // Agrega más clientes simulados según sea necesario
];

const ClientesSelect = ({ onSelect }) => {
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');

  const handleChange = (event) => {
    const clienteId = event.target.value;
    const cliente = clientesSimulados.find((cliente) => cliente.id === parseInt(clienteId));
    setClienteSeleccionado(cliente);
    onSelect(cliente);
  };

  return (
    <div>
      <label htmlFor="cliente">Seleccionar Cliente:</label>
      <select id="cliente" value={clienteSeleccionado.id} onChange={handleChange}>
        <option value="">Seleccione un cliente</option>
        {clientesSimulados.map((cliente) => (
          <option key={cliente.id} value={cliente.id}>
            {cliente.nombre}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ClientesSelect;
