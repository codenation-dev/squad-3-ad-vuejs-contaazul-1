using System.Threading.Tasks;
using CentralErrosApi.Entities;

namespace CentralErrosApi.Data
{
    public interface IUsuarioRepository : IRepositoryBase<Usuario>
    {
        Task<Usuario> FindByEmail(string email);
        Task<Usuario> Autenticar(string email, string senha);
    }
}