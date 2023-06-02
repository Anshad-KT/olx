import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Heart from '../../assets/Heart';
import { FirebaseContext } from '../../store/Context';
import { postContext } from '../../store/PostContext';
import './Post.css';

function Posts(): JSX.Element {
  const {db}=useContext(FirebaseContext)
  const {setPost}=useContext(postContext)
  const navigate=useNavigate()
  const [products,setProducts]=useState<{id:string,url:string,price:number,date:string,category:string,name:string}[]>()

  useEffect(()=>{
    getDocs(collection(db,'products')).then((data)=>{
      const allPost=data.docs.map((product)=>{
        return{
          ...product.data(),id:product.id
        } 
      })
      setProducts(allPost)
    })
  },[])
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart />
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>Tue May 04 2021</span>
            </div>
          </div>
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">

          {
           
           products?.map((item)=>{
            return(
              <div className="card" onClick={()=>{setPost(item); navigate('/viewpost')}}>
            <div className="favorite">
              <Heart />
            </div>
            <div className="image">
              <img src={item.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9;{item.price} </p>
              <span className="kilometer">{item.category}</span>
              <p className="name"> {item.name} </p>
            </div>
            <div className="date">
              <span>{item.date}</span>
            </div>
          </div>
            )
            
           })

       
}

        </div>
      </div>
    </div>
  );
}

export default Posts;
