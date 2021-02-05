import "../Styles/UserProfile.css";

const UserProfile = ({ user, title }) => {
  return (
    <div className="profile-container">
      <h2>{title}</h2>
      <div className="name">{user.name}</div>
      <div className="age">{user.age}</div>
    </div>
  );
};

export default UserProfile;
