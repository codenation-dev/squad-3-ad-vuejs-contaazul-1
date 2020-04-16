using System.ComponentModel.DataAnnotations;

namespace CentralErrosApi.Entities
{
    public class Usuario
    {
        [Key]
        public string Email { get; set; }
        public string Senha { get; set; }
        public string Token { get; set; }
    }
}