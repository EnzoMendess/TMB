import { useState, useEffect } from "react";
import { getOrders } from "./services/api";
import OrderForm from "./components/OrderForm";
import OrderTable from "./components/OrderTable";
import OrderDetails from "./components/OrderDetails";

export default function App() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter(o =>
    o.cliente.toLowerCase().includes(search.toLowerCase()) ||
    o.produto.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const load = async () => {
      const data = await getOrders();
      setOrders(data);
    };

    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Gestão de Pedidos
        </h1>
        <OrderForm onOrderCreated={() => getOrders().then(setOrders)} />
        <input
          className="border rounded p-2 mb-4 w-full"
          placeholder="Buscar por cliente ou produto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <OrderTable orders={filteredOrders} onSelectOrder={setSelectedOrder} />
        <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      </div>
    </div>
  );
}