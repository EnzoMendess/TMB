using System.Text.Json.Serialization;
namespace Backend.Models;

public class Order
{
    public Guid Id { get; set; }
    
    public string Cliente { get; set; } = string.Empty;

    public string Produto { get; set; }

    public decimal Valor { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public OrderStatus Status { get; set; } = OrderStatus.Pendente;

    public DateTime Data_Criacao { get; set; } = DateTime.UtcNow;
}