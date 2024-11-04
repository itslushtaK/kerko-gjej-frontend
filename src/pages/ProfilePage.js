// ProfilePage.js
import React from "react";
import ProfileView from "./ProfileView";
import ChangePassword from "./ChangePassword";

const ProfilePage = () => {
  return (
    <div className="max-w-md mx-auto mt-8">
      <ProfileView />
      <div className="border-t my-6"></div>
      <ChangePassword />
    </div>
  );
};

export default ProfilePage;
