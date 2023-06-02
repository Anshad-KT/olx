import React, { Fragment } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useState } from 'react';

const Create: React.FC = () => {
  const [name,setName] = useState<string>('')
  const [category,setCategory] = useState<string>('')
  const [price,setPrice] = useState<number>()
  const [image,setImage] = useState<File|undefined>()
  return (
    <Fragment>
      <Header />
      <div className="card">
        <div className="centerDiv">
          <form>
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
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image): ""} />
          <form>
            <br />
            <input onChange={(e)=>setImage(e.target.files?.[0])} type="file" />
            <br />
            <button className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
