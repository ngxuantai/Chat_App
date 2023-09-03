import React, {useState, useEffect} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import loader from '../assets/loader.gif';
import {Buffer} from 'buffer';
import axios from 'axios';
import {setAvatar} from '../services/userApi';

function SetAvater() {
  const navigate = useNavigate();
  const apiAvatar = 'https://api.multiavatar.com/45678945';
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar.', toastOptions);
      return;
    } else {
      const data = await setAvatar(avatars[selectedAvatar]);
      console.log(avatars[selectedAvatar]);
      console.log(data);
      if (data.data.isSet) {
        navigate('/');
      }
    }
  };

  const getDataAvatar = async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const response = await axios.get(
        `${apiAvatar}/${Math.round(Math.random() * 1000)}`
      );
      console.log('1');
      const buffer = Buffer.from(response.data);
      data.push(buffer.toString('base64'));
      if (i < 3) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        console.log('2');
      }
    }
    setAvatars(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getDataAvatar();
  }, []);

  return (
    <>
      <Container>
        <div className="title-container">
          <h1>Set an avatar as your profile picture</h1>
        </div>
        {isLoading ? (
          <img src={loader} alt="loading" className="loader"></img>
        ) : (
          <>
            <div className="avatars">
              {avatars.map((avatar, index) => {
                return (
                  <div
                    key={index}
                    className={`avatar ${
                      selectedAvatar === index ? 'selected' : ''
                    }`}
                  >
                    <img
                      style={{width: '100px', height: '100px'}}
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                );
              })}
            </div>
            <button className="submit-btn" onClick={() => setProfilePicture()}>
              Set as profile picture
            </button>
          </>
        )}
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: white;
  .loader {
    height: 8rem;
  }
  .title-container {
    h1 {
      background: -webkit-linear-gradient(#997af0, #08286c);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0px;
      font-family: Helvetica, Arial, sans-serif;
      font-size: 2rem;
    }
  }
  .avatars {
    display: flex;
    gap: 1rem;
    .avatar {
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.2s ease-in-out;
      border: 0.4rem solid transparent;
      height: 6rem;
    }
    .selected {
      border: 0.4rem solid #997af0;
      box-shadow: -3px -3px 15px #997af0;
    }
  }
  .submit-btn {
    background: linear-gradient(to right, #997af0, #08286c);
    padding: 10px;
    border-radius: 0.5rem;
    border: none;
    color: white;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: 0.4s ease-in-out;
    &:hover {
      box-shadow: -3px -3px 15px #997af0;
    }
  }
`;

export default SetAvater;
