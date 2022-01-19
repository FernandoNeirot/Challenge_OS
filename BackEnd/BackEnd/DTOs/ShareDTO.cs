using DataAccess.Models;

namespace BackEnd.DTOs
{
    public class ShareDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Symbol { get; set; }
        public string Name { get; set; }
        public string Currency { get; set; }
        public bool Deleted { get; set; }
        public ShareDTO()
        {

        }
        public ShareDTO(Share share)
        {
            Id = share.Id;
            UserId = share.UserId;
            Symbol = share.Symbol;
            Name = share.Name;
            Currency = share.Currency;
            Deleted = share.Deleted;
        }

        public Share ToEntity()
        {
            return new Share
            {
                Id=Id,
                UserId=UserId,
                Symbol=Symbol,
                Name=Name,
                Currency=Currency,
                Deleted=Deleted,
            };
        }
    }
}
