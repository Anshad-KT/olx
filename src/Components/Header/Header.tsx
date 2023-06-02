import React from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useContext } from 'react';
import { AuthContext } from '../../store/Context';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

function Header(): JSX.Element {
  const navigate=useNavigate()
  const {user} = useContext(AuthContext)

    const handleSignOut=(e:React.ChangeEvent<HTMLInputElement>)=>{
      e.preventDefault()
      try{
        auth.signOut().then(()=>{
          navigate('/login')
        })
      }catch(err){
        console.log(err);
        
      }
    }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search color={undefined} />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage">
        <span>{user ? user.displayName : 'Login' }</span>
          <hr />
          
        </div>
<span onClick={handleSignOut}>{user ? "Logout" : null }</span>
        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
