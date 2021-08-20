import "./profile.css";

import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

  const username = useParams().username;
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/users?username=" + username);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={user.coverPicture || `${PF}post/3.jpeg`}
                alt=""
                className="profileCoverImg"
              />
              <img
                src={user.profilePicture || `${PF}no_avatar.png`}
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDescription">{user.description}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
