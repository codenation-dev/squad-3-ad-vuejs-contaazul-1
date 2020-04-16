using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CentralErrosApi.Data
{
    public class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected DataContext _db { get; }
        public RepositoryBase(DataContext db)
        {
            _db = db;
        }
        public void Add(T entity)
        {
            _db.Add(entity);
        }

        public void Delete(T entity)
        {
            _db.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _db.SaveChangesAsync() > 0;
        }
    }
}