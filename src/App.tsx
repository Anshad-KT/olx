
import React,{useEffect,useContext} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Home from './Pages/Home';
import Login from './Components/Login/Login';
import { AuthContext, FirebaseContext } from "./store/Context";
import { auth } from "./firebase/config";
import Create from './Components/Create/Create';
import ViewPost from './Pages/ViewPost';
import PostDetails from './store/PostContext';

function App(): JSX.Element {
  
  const {setUser} = useContext(AuthContext)

  useEffect(()=>{
    
     auth.onAuthStateChanged((user)=>{
       console.log(user);
       setUser(user)
     })
  },[])
  return (
    <div>
      <PostDetails>

     
      <Router>
        <Routes>
         <Route path='/' element={<Home />} /> 
         <Route path='/signup' element={<Signup />} /> 
         <Route path='/login' element={<Login />} /> 
         <Route path='/create' element={<Create />} /> 
         <Route path='/viewpost' element={<ViewPost />} /> 
        </Routes>
      </Router>
      </PostDetails>
    </div>
  );
}

export default App;
