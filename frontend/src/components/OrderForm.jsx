import { useState } from "react";
import { createOrder } from "../services/api";

export default function OrderForm({ onOrderCreated }) {
  const [form, setForm] = useState({ cliente: "", produto: "", valor: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await createOrder({ ...form, valor: parseFloat(form.valor) });
    setForm({ cliente: "", produto: "", valor: "" });
    setLoading(false);
    onOrderCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-bold mb-4">Novo Pedido</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <input
          name="cliente"
          value={form.cliente}
          onChange={handleChange}
          placeholder="Cliente"
          required
          className="border rounded p-2 w-full"
        />
        <input
          name="produto"
          value={form.produto}
          onChange={handleChange}
          placeholder="Produto"
          required
          className="border rounded p-2 w-full"
        />
        <input
          name="valor"
          value={form.valor}
          onChange={handleChange}
          placeholder="Valor"
          type="number"
          required
          className="border rounded p-2 w-full"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Criando..." : "Criar Pedido"}
      </button>
    </form>
  );
}