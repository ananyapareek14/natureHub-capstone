namespace NatureHubApi.Model.DTO
{
    public class OrderItemDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; } // Price at the time of purchase
    }
}
