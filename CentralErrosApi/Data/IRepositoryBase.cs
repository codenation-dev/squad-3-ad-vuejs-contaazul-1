using System.Threading.Tasks;

namespace CentralErrosApi.Data
{
    public interface IRepositoryBase<T>  where T : class
    {
         void Add(T entity);
         void Delete(T entity);
         Task<bool> SaveChangesAsync();
    }
}