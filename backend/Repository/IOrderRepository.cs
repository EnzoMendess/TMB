using Backend.Models;

namespace Backend.Repositories;

public interface IOrderRepository
{
    Task<Order> CreateAsync(Order order);
    Task<List<Order>> GetAllAsync();
    Task<Order?> GetByIdAsync(Guid id);
    Task UpdateAsync(Order order);
}