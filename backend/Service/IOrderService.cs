using Backend.Models;

namespace Backend.Services;

public interface IOrderService
{
    Task<Order> CreateAsync(Order order);
    Task<List<Order>> GetAllAsync();
    Task<Order?> GetByIdAsync(Guid id);
    Task UpdateStatusAsync(Guid id, OrderStatus status);
}