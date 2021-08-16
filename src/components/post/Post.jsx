import { MoreVert } from "@material-ui/icons";
import React from "react";
import { Users } from "../../DummyData";
import "./post.css";

export default function Post({ post }) {
  const user = Users.filter((u) => u.id === post.userId)[0];
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={user.profilePicture} alt="" className="postProfileImg" />
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.description}</span>
          <img src={post.photo} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src="/assets/like.png" alt="" className="likeIcon" />
            <img src="/assets/heart.png" alt="" className="likeIcon" />
            <span className="postLikeCounter">
              {post.like} people likes it.
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
