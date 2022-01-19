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

        public List<Share> GetAllByUser(int userId) =>
            _context.Shares.Where(x => x.UserId == userId).ToList();
        
    }
}