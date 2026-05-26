const statusColors = {
  Pendente: "bg-yellow-100 text-yellow-800",
  Processando: "bg-blue-100 text-blue-800",
  Finalizado: "bg-green-100 text-green-800",
};

export default function OrderTable({ orders, onSelectOrder }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Valor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">{order.cliente}</td>
              <td className="px-6 py-4">{order.produto}</td>
              <td className="px-6 py-4">R$ {order.valor.toFixed(2)}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {new Date(order.data_Criacao).toLocaleString("pt-BR")}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onSelectOrder(order)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && (
        <p className="text-center text-gray-400 py-8">Nenhum pedido encontrado.</p>
      )}
    </div>
  );
}