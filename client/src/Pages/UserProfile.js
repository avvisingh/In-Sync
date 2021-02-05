import "../Styles/UserProfile.css";
import Logout from "../Components/Logout";

const UserProfile = ({ user, title }) => {
  return (
    <div className="profile-container">
      <h2>{title}</h2>
      <div className="name">{user.name}</div>
      <div className="age">{user.age}</div>
      <Logout />
    </div>
  );
};

export default UserProfile;
