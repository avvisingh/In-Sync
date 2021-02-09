import "../Styles/UserProfile.css";
import Logout from "../Components/Logout";

const UserProfile = ({ user, title }) => {
  let imgSource = `http://localhost:8080/users/${user._id}/avatar`;

  return (
    <div className="profile-container">
      <div className="user-info">
        <h2>{title}</h2>
        <div className="name">{user.name}</div>
        <div className="age">{user.age}</div>
        <Logout />
      </div>
      <img src={imgSource} className="avatar" alt="User's profile" />
    </div>
  );
};

export default UserProfile;
