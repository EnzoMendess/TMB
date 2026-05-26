using Backend.Models;
using Backend.Services;

namespace Backend.Workers;

public class OrderProcessingWorker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<OrderProcessingWorker> _logger;

    public OrderProcessingWorker(IServiceScopeFactory scopeFactory, ILogger<OrderProcessingWorker> logger)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("Worker iniciado.");

        while (!stoppingToken.IsCancellationRequested)
        {
            using var scope = _scopeFactory.CreateScope();
            var service = scope.ServiceProvider.GetRequiredService<IOrderService>();

            var orders = await service.GetAllAsync();
            var pendentes = orders.Where(o => o.Status == OrderStatus.Pendente).ToList();

            foreach (var order in pendentes)
            {
                _logger.LogInformation("Processando pedido {OrderId}...", order.Id);

                await service.UpdateStatusAsync(order.Id, OrderStatus.Processando);

                await Task.Delay(5000, stoppingToken);

                await service.UpdateStatusAsync(order.Id, OrderStatus.Finalizado);

                _logger.LogInformation("Pedido {OrderId} finalizado.", order.Id);
            }

            await Task.Delay(5000, stoppingToken);
        }
    }
}