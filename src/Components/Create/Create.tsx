import React, { Fragment } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from "../../store/Context";
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { ref , uploadBytes ,getDownloadURL } from 'firebase/storage';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


const Create: React.FC = () => {
  const  {db,storage} = useContext(FirebaseContext)
  const  {user} = useContext(AuthContext)
  const date = new Date().toDateString()
  const [name,setName] = useState<string>('')
  const [category,setCategory] = useState<string>('')
  const [price,setPrice] = useState<number>()
  const [image,setImage] = useState<any>()
   const navigate=useNavigate()
  const handleUpload = () => {
    const storageRef = ref(storage,'Images/'+image.name)
    uploadBytes(storageRef,image).then((reference)=>{
        getDownloadURL(reference.ref).then((url)=>{
          console.log("fgg");
          
            addDoc(collection(db,'products'),{
                name,
                category:category,
                price,
                url,
                userId:user.uid,
                createdAt:date
            }).then(()=>{
                navigate('/')
                console.log("success");
                
            })
        })
    })
  }
  
   
    
  return (
    <Fragment>
      <Header />
      <div className="card">
        <div className="centerDiv">
         
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" value={price}
            
              onChange={(e)=>setPrice(parseInt(e.target.value))} type="number" id="fname" name="Price" />
            <br />
         
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image): ""} />
          
            <br />
            <input onChange={(e)=>setImage(e.target.files?.[0])} type="file" />
            <br />
            <button onClick={handleUpload} className="uploadBtn">upload and Submit</button>
        
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
