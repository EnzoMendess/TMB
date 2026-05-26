const statusColors = {
  Pendente: "bg-yellow-100 text-yellow-800",
  Processando: "bg-blue-100 text-blue-800",
  Finalizado: "bg-green-100 text-green-800",
};

export default function OrderDetails({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Detalhes do Pedido</h2>
        <div className="space-y-3">
          <div>
            <span className="text-gray-500 text-sm">Cliente</span>
            <p className="font-medium">{order.cliente}</p>
          </div>
          <div>
            <span className="text-gray-500 text-sm">Produto</span>
            <p className="font-medium">{order.produto}</p>
          </div>
          <div>
            <span className="text-gray-500 text-sm">Valor</span>
            <p className="font-medium">R$ {order.valor.toFixed(2)}</p>
          </div>
          <div>
            <span className="text-gray-500 text-sm">Status</span>
            <div className="mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                {order.status}
              </span>
            </div>
          </div>
          <div>
            <span className="text-gray-500 text-sm">Data de Criação</span>
            <p className="font-medium">{new Date(order.data_Criacao).toLocaleString("pt-BR")}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}