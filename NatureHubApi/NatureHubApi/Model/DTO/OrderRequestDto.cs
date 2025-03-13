namespace NatureHubApi.Model.DTO
{
    public class OrderRequestDto
    {
        public Guid UserId { get; set; }
        public List<OrderItemDto> OrderItems { get; set; } = new();
    }
}
