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

        public async Task<List<Log>> Get()
        {
            return await _db.Logs.ToListAsync();
        }

        public void Update(Log log)
        {
            _db.Update(log);
        }

        public async Task<List<Log>> GetArquivados()
        {
            return await _db.Logs.Where(x => x.Arquivado).ToListAsync();
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