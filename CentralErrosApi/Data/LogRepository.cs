using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CentralErrosApi.Entities;
using CentralErrosApi.Enums;
using Microsoft.EntityFrameworkCore;
using CentralErrosApi.Helpers;
using System;

namespace CentralErrosApi.Data
{
    public class LogRepository : RepositoryBase<Log>, ILogRepository
    {
        public LogRepository(DataContext db) : base(db)
        {
        }

        public async Task<List<Log>> Get(List<LocalEnum> locais, string searchProperty, string searchPhrase, string sortProperty, string sortOrder, int pageSize, int page)
        {
            IQueryable<Log> query = _db.Logs.Where(x => locais.Contains(x.Local));

            if (string.Equals(searchProperty.Trim(), "level", StringComparison.OrdinalIgnoreCase))
            {
                if (Enum.TryParse(searchPhrase, true, out TipoLogEnum en))
                {
                    query = query.Where(x => x.Level == en);
                }
            }
            else if (string.Equals(searchProperty.Trim(), "titulo", StringComparison.OrdinalIgnoreCase))
            {
                query = query.Where(x => x.Titulo.ToLower().Contains(searchPhrase.ToLower()));
            }
            else if (string.Equals(searchProperty.Trim(), "origem", StringComparison.OrdinalIgnoreCase))
            {
                query = query.Where(x => x.Origem.ToLower().Contains(searchPhrase.ToLower()));
            }

            return await query.OrderBy(sortProperty, sortOrder).Page((page - 1) * pageSize, pageSize).Take(pageSize).ToListAsync();
        }
        public void DeleteAll(List<int> ids)
        {
            var logs = _db.Logs.Where(x => ids.Contains(x.Id));

            foreach (var log in logs)
            {
                _db.Remove(log);
            }
        }

        public async Task<Log> GetByIdAsync(int id)
        {
            return await _db.Logs.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}