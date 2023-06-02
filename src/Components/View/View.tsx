import {   collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../store/Context';
import { postContext } from '../../store/PostContext';

import './View.css';

const View: React.FC = () => {
  const [userDetails,setUserDetails] = useState<any>()
  const {post} = useContext(postContext)
  const {db} = useContext(FirebaseContext)

  useEffect(()=>{
    console.log(post);
    const userQuery=query(
        collection(db,'users'),
        where('id','==',post.userId)
    )
    getDocs(userQuery).then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
            setUserDetails(doc.data())
        })
    })
   
},[post.userId])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={post.url} alt="" />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9;{post.price}</p>
          <span>{post.name}</span>
          <p>{post.category}</p>
          <span>{post.date}</span>
        </div>
        {userDetails && <div className="contactDetails">
            <h3 >Seller Information</h3>
            
          <p>{userDetails?.username}</p>
          <p>{userDetails?.phone}</p>
          
        </div>}
      </div>
    </div>
  );
};

export default View;
