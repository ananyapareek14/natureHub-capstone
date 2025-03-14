namespace NatureHubApi.Model.DTO
{
    public class LoginResponseDto
    {
        public string Token { get; set; }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
