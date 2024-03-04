"use client";

import LoginPrompt from "@/components/features/user/toLoginPage";
import { isLoginContext, userInfoContext } from "@/hooks/useGetCurrentUser";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowDown, faPen } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faSquareInstagram,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import domtoimage from "dom-to-image";

const UserShowPage = () => {
  const isLogin = useContext(isLoginContext);
  const [userInfo, setUserInfo] = useContext(userInfoContext);
  const [isPop, setIsPop] = useState<boolean>(false);

  if (!isLogin) return <LoginPrompt />;

  const downloadProfileCard = async () => {
    const node = document.getElementById("profile-card") as HTMLDivElement;

    domtoimage
      .toPng(node)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "component_image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error converting to image:", error);
      });
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <p className="text-lg font-semibold mb-4 flex items-center">My Profile</p>

      <div
        id="profile-card"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex"
      >
        <div className="m-5 text-center">
          <p>
            <img
              src={userInfo.image}
              alt="user image"
              className="h-[100px] w-[100px] border border-black rounded-[50px]"
              style={{ objectFit: "cover" }}
            />
          </p>
          <p className="m-1">
            <FontAwesomeIcon icon={faSquareXTwitter} className="mr-2" />
            @hoge
          </p>
          <p className="m-1">
            <FontAwesomeIcon icon={faSquareInstagram} className="mr-2" />
            @hoge
          </p>
          <p className="m-1">
            <FontAwesomeIcon icon={faFacebook} className="mr-2" />
            @hoge
          </p>
        </div>
        <div>
          <div className="mb-4">
            <p className="text-gray-700 text-[2em]">{userInfo.username}</p>
            <p className="text-gray-400 text-sm">id: {userInfo.id}</p>
          </div>
          <div className="mb-4 flex">
            <p className="block text-gray-700 text-sm font-bold mb-2 py-1 w-[70px] bg-gray-200 rounded-md text-center mr-2">
              Email
            </p>
            <p className="text-gray-700 text-base">{userInfo.email}</p>
          </div>
          <div className="mb-4 flex">
            <p className="block text-gray-700 text-sm font-bold mb-2 py-1 w-[70px] bg-gray-200 rounded-md text-center mr-2">
              Name
            </p>
            <p className="text-gray-700 text-base">
              {userInfo.firstName} {userInfo.lastName}
            </p>
          </div>
          <div className="mb-4 flex">
            <p className="block text-gray-700 text-sm font-bold mb-2 py-1 w-[70px] bg-gray-200 rounded-md text-center mr-2">
              Gender
            </p>
            <p className="text-gray-700 text-base">{userInfo.gender}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <p className="w-[50%] border border-black rounded-lg p-2 m-2 hover:text-gray-400 hover:border-gray-400">
          <button onClick={() => setIsPop(!isPop)}>
            <FontAwesomeIcon icon={faPen} className="mr-3" />
            編集
          </button>
        </p>
        <p className="w-[50%] border border-black rounded-lg p-2 m-2 hover:text-gray-400 hover:border-gray-400">
          <button onClick={downloadProfileCard}>
            <FontAwesomeIcon icon={faCircleArrowDown} className="mr-3" />
            ダウンロード
          </button>
        </p>
      </div>
      {isPop && (
        <p className="text-center">
          <span className="text-red-500">※編集ページは作成していません</span>
        </p>
      )}
    </div>
  );
};

export default UserShowPage;
