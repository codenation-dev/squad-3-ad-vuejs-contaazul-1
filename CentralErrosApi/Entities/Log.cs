using System;
using CentralErrosApi.Enums;

namespace CentralErrosApi.Entities
{
    public class Log
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Detalhes { get; set; }
        public TipoLogEnum Level { get; set; }
        public LocalEnum Local { get; set; }
        public string Origem { get; set; }
        public int Frequencia { get; set; }
        public DateTime Data { get; set; }
        public string TokenUsuario { get; set; }
        public bool Arquivado { get; set; }
    }
}