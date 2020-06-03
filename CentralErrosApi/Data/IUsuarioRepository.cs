using System.Threading.Tasks;
using CentralErrosApi.Entities;

namespace CentralErrosApi.Data
{
    public interface IUsuarioRepository : IRepositoryBase<Usuario>
    {
        Task<Usuario> FindByEmail(string email);
        Task<Usuario> GetUsuario(string email, string senha);
        Task<Usuario> Autenticar(string email, string senha);
    }
}