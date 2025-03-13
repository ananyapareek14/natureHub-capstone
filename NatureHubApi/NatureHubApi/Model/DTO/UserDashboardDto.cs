namespace NatureHubApi.Model.DTO
{
    public class UserDashboardDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public int CartItemCount { get; set; }
        public int OrderCount { get; set; }
    }
}
