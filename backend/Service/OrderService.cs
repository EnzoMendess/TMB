using Backend.Models;
using Backend.Repositories;

namespace Backend.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _repository;

    public OrderService(IOrderRepository repository)
    {
        _repository = repository;
    }

    public async Task<Order> CreateAsync(Order order)
    {
        order.Id = Guid.NewGuid();
        order.Status = OrderStatus.Pendente;
        order.Data_Criacao = DateTime.UtcNow;

        return await _repository.CreateAsync(order);
    }

    public async Task<List<Order>> GetAllAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task<Order?> GetByIdAsync(Guid id)
    {
        return await _repository.GetByIdAsync(id);
    }

    public async Task UpdateStatusAsync(Guid id, OrderStatus status)
    {
        var order = await _repository.GetByIdAsync(id);
        if (order is null) return;

        order.Status = status;
        await _repository.UpdateAsync(order);
    }
}