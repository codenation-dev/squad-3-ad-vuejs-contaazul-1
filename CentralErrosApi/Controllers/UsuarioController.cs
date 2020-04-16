using System.Threading.Tasks;
using CentralErrosApi.Data;
using CentralErrosApi.Entities;
using CentralErrosApi.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CentralErrosApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository _repo { get; }
        public UsuarioController(IUsuarioRepository repo)
        {
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> Post(LoginModel model)
        {
            var user = await _repo.FindByEmail(model.Email);

            if (user == null)
            {
                var usuario = new Usuario
                {
                    Email = model.Email,
                    Senha = model.Senha
                };

                _repo.Add(usuario);

                if (await _repo.SaveChangesAsync())
                {
                    usuario.Token = (await _repo.Autenticar(model.Email, model.Senha)).Token;
                    return Ok(usuario);
                }

                return BadRequest();
            }
            return BadRequest("Usuário já existe.");
        }

        [HttpPost("autenticar")]
        public async Task<IActionResult> Autenticar(LoginModel model)
        {
            var user = await _repo.Autenticar(model.Email, model.Senha);

            if (user == null)
                return BadRequest(new { message = "Usuário ou senha incorretos" });

            return Ok(user);
        }
    }
}