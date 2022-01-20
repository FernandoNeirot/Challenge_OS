using DataAccess;
using DataAccess.Models;

namespace Services
{
    public class ShareService:IShareService
    {
        private readonly AppChallengeContext _context;
        public ShareService(AppChallengeContext appDBContext)
        {
            _context = appDBContext;
        }

        public bool Add(Share share)
        {
            _context.Shares.Add(share);
            return _context.SaveChanges()==1?true:false;
        }
        //realizo borrado fisico
        public bool Delete(int shareId)
        {
            var share = _context.Shares.First(x => x.Id == shareId);
            _context.Shares.Remove(share);
            return _context.SaveChanges() == 1 ? true : false;
        }
        public bool DuplicateRow(Share share)=>_context.Shares.Any(x => x.Symbol == share.Symbol && x.UserId == share.UserId);

        public List<Share> GetAllByUser(int userId) =>
            _context.Shares.Where(x => x.UserId == userId).ToList();
        
    }
}