import React from 'react';
import { Users } from '../../DummyData';
import Online from '../online/Online';
import "./rightbar.css"

export default function Rightbar(){
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="" />
          <span className="birthdaText">
            <b>Zarnish Aley</b> and <b>2 other friends</b> have a birthday today.
          </span>
        </div>
        <img src="/assets/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>

        <ul className="rightbarFriendsList">
          {
            Users.map((u)=>{
              return <Online key={u.id} user={u} />
            })
          }
        </ul>

      </div>  
    </div>
  )
}