using System;

namespace ResourceR.Models
{
    public class Asset : IDocument
    {
        public string Id { get; set; }
        public string AssetName { get; set; }
        public string Team { get; set; }
        public string CurrentOwner { get; set; }
        public DateTime? EstimatedCompletion { get; set; }
        public bool IsLocked { get; set; }
    }
}