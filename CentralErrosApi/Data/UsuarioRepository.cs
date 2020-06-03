using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CentralErrosApi.Helpers;
using CentralErrosApi.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace CentralErrosApi.Data
{
    public class UsuarioRepository : RepositoryBase<Usuario>, IUsuarioRepository
    {
        public UsuarioRepository(DataContext db) : base(db)
        {
        }

        public async Task<Usuario> FindByEmail(string email)
        {
            return await _db.Usuarios.SingleOrDefaultAsync(x => x.Email.Equals(email.Trim()));
        }

        public async Task<Usuario> GetUsuario(string email, string senha)
        {
            return await _db.Usuarios.SingleOrDefaultAsync(x => x.Email.Equals(email.Trim()) && x.Senha.Equals(senha.Trim()));
        }

        public async Task<Usuario> Autenticar(string email, string senha)
        {
            var usuario = await GetUsuario(email, senha);

            if (usuario == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("completelyrandombigstringasdasdasdasdasdasdasdasdasd");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("Name", usuario.Email.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            usuario.Token = tokenHandler.WriteToken(token);

            return usuario;
        }
    }
}