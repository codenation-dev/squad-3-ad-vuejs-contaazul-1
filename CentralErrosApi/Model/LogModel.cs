using System;
using CentralErrosApi.Enums;

namespace CentralErrosApi.Model
{
    public class LogModel
    {
        public string Titulo { get; set; }
        public string Detalhes { get; set; }
        public TipoLogEnum Level { get; set; }
        public LocalEnum Local { get; set; }
        public string Origem { get; set; }
        public int Frequencia { get; set; }
        public DateTime Data { get; set; }
    }
}