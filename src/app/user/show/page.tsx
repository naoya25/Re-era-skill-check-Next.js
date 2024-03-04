"use client";

import LoginPrompt from "@/components/features/user/toLoginPage";
import { isLoginContext, userInfoContext } from "@/hooks/useGetCurrentUser";
import { useContext, useEffect, useState } from "react";

const UserShowPage = () => {
  const isLogin = useContext(isLoginContext);
  const [userInfo, setUserInfo] = useContext(userInfoContext);

  if (!isLogin) return <LoginPrompt />;

  return (
    <div className="max-w-xl mx-auto mt-8">
      <p className="text-lg font-semibold mb-4">My Profile</p>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID:
          </label>
          <p className="text-gray-700 text-base">{userInfo.id}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username:
          </label>
          <p className="text-gray-700 text-base">{userInfo.username}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <p className="text-gray-700 text-base">{userInfo.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            First Name:
          </label>
          <p className="text-gray-700 text-base">{userInfo.firstName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Last Name:
          </label>
          <p className="text-gray-700 text-base">{userInfo.lastName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Gender:
          </label>
          <p className="text-gray-700 text-base">{userInfo.gender}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image:
          </label>
          <p className="text-gray-700 text-base">{userInfo.image}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Token:
          </label>
          <p className="text-gray-700 text-base break-words">{userInfo.token}</p>
        </div>
      </div>
    </div>
  );
};

export default UserShowPage;
