import { MoreVert } from '@material-ui/icons'
import React from 'react'
import './post.css'

export default function Post(){
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src="/assets/person/1.jpeg" alt="" className="postProfileImg" />
            <span className="postUsername">Happy Humza</span>
            <span className="postDate">17 mins ago</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">You can find me here xD</span>
          <img src="/assets/post/1.jpeg" alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src="/assets/like.png" alt="" className="likeIcon" />
            <img src="/assets/heart.png" alt="" className="likeIcon" />
            <span className="postLikeCounter">44 people likes it.</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">18 comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}