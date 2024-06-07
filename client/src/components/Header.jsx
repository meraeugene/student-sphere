import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const profilePicture = useSelector(
    (state) => state.auth.userInfo?.profile_picture
  );

  return (
    <header className="h-[55px] sticky w-full top-0 z-10  bg-white py-7 px-8 pl-0  border-b border flex justify-between items-center">
      <div />
      <div className="nav__container flex items-center gap-6">
        <Link to="/profile-management">
          <img
            src={profilePicture}
            alt="profile"
            className="w-[35px] h-[35px] rounded-full"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
