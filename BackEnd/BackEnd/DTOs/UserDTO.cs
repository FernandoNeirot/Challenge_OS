using DataAccess.Models;

namespace BackEnd.DTOs
{
    public class UserDTO
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public UserDTO()
        {

        }
        public UserDTO(User user)
        {
            UserName = user.UserName;
        }
        public User ToEntity()
        {
            return new User
            {
                UserName = UserName,
                Password = Password,
            };
        }
    }
}
