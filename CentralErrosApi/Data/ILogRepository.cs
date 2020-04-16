using System.Collections.Generic;
using System.Threading.Tasks;
using CentralErrosApi.Entities;
using CentralErrosApi.Enums;

namespace CentralErrosApi.Data
{
    public interface ILogRepository : IRepositoryBase<Log>
    {
        Task<Log> GetByIdAsync(int id);
        void DeleteAll(List<int> ids);
        Task<List<Log>> Get(List<LocalEnum> locais, string searchProperty, string searchPhrase, string sortProperty, string sortOrder, int pageSize, int page);
    }
}