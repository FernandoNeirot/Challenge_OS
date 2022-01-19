using DataAccess;
using DataAccess.Models;

namespace Services
{
    public class UserService : IUserService
    {
        private readonly AppChallengeContext _context;
        public UserService(AppChallengeContext appDBContext)
        {
            _context = appDBContext;
        }

        public int GetUserId(string username)
        {
            if (_context.Users.Any(x => x.UserName.Trim().ToLower() == username.Trim().ToLower()))
                return _context.Users.FirstOrDefault(x => x.UserName.Trim().ToLower() == username.Trim().ToLower()).Id;
            else
                return 0;
        }
        //TODO: Aca debo hacer un metodo para encriptar, y que la pass guardada este encriptada por seguridad
        public bool Login(User user) =>
            _context.Users.Any(x => x.UserName.Trim().ToLower() == user.UserName.Trim().ToLower() && x.Password == user.Password);

    }

}
