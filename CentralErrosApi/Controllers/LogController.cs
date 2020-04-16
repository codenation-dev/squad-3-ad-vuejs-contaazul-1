using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CentralErrosApi.Data;
using CentralErrosApi.Entities;
using CentralErrosApi.Enums;
using CentralErrosApi.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CentralErrosApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class LogController : ControllerBase
    {
        public ILogRepository _repo { get; set; }
        public LogController(ILogRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] List<int> locais, string searchProperty = "", string searchPhrase = "", string sortProperty = "", string sortOrder = "", int pageSize = 20, int page = 1)
        {
            return Ok(await _repo.Get(locais.Select(x => (LocalEnum)x).ToList(), searchProperty, searchPhrase, sortProperty, sortOrder, pageSize, page));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var log = await _repo.GetByIdAsync(id);

            if (log == null) return NotFound();

            return Ok(log);
        }

        [HttpPost]
        public async Task<IActionResult> Post(LogModel model)
        {
            var log = new Log()
            {
                Titulo = model.Titulo,
                Detalhes = model.Detalhes,
                Local = model.Local,
                Origem = model.Origem,
                Level = model.Level,
                Frequencia = model.Frequencia,
                Data = model.Data,
                TokenUsuario = Request.Headers["Authorization"].ToString().Split(" ").Last()
            };

            _repo.Add(log);
            if (await _repo.SaveChangesAsync())
            {
                return Created($"/api/log/{log.Id}", log);
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var log = await _repo.GetByIdAsync(id);

            if (log == null) return NotFound();

            _repo.Delete(log);

            if (await _repo.SaveChangesAsync())
            {
                return Ok();
            }

            return BadRequest();
        }

        [HttpDelete("deleteAll")]
        public async Task<IActionResult> DeleteAll([FromQuery] List<int> ids)
        {
            _repo.DeleteAll(ids);
            if (await _repo.SaveChangesAsync())
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}