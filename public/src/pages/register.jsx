import React, {useState, useEffect} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import backgroundGalaxy from '../assets/background-galaxy.png';
import {createUser} from '../services/userApi';

function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const toastOptions = {
    position: 'top-right',
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const handleValidation = () => {
    const {username, email, password, confirmPassword} = values;
    if (username.length < 3) {
      toast.error('Username must be at least 3 characters.', toastOptions);
      return false;
    } else if (email === '') {
      toast.error('Email is required.', toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error('Password and confirm password do not match.', toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error('Password must be ay least 8 characters.', toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const {username, email, password} = values;
      const {data} = await createUser({username, email, password});
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        navigate('/');
      }
    }
  };

  const handleChange = (event) => {
    const {name, value} = event.target;
    setValues({...values, [name]: value});
  };

  return (
    <>
      <Background />
      <FormContainer>
        <div className="logo">
          {/* <img src={logo} alt="logo" /> */}
          <h1>Welcome!</h1>
          <h2>To Chat App</h2>
        </div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            autoComplete="off"
            type="text"
            name="username"
            placeholder="Username"
            onChange={(event) => handleChange(event)}
          />
          <input
            autoComplete="off"
            type="email"
            name="email"
            placeholder="Email"
            onChange={(event) => handleChange(event)}
          />
          <input
            autoComplete="off"
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => handleChange(event)}
          />
          <input
            autoComplete="off"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={(event) => handleChange(event)}
          />
          <button type="submit">Create account</button>
          <span>
            Already have a account? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const Background = styled.div`
  height: 100vh;
  width: 100%;
  background-image: url(${backgroundGalaxy});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const FormContainer = styled.div`
  padding: 2rem 4rem;
  display: flex;
  justify-content: center;
  gap: 6rem;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${backgroundGalaxy});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  .logo {
    display: flex;
    align-items: center;
    flex-direction: column;
    img {
      height: 16rem;
    }
    h1,
    h2 {
      color: white;
      text-shadow: 0 0 0.5rem black;
      margin: 0px;
      font-family: Helvetica, Arial, sans-serif;
      font-size: 5rem;
      text-shadow: 4px 5px 4px rgba(0, 0, 0, 0.8);
    }
    h2 {
      font-size: 3rem;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 3rem 5rem;
    border-radius: 2rem;
    position: relative;
    z-index: 1;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: transparent;
      backdrop-filter: blur(8px);
      z-index: -1; /* Đặt lớp nền mờ ở phía sau form */
    }
    input {
      background-color: #212121;
      color: white;
      padding: 10px;
      border: 2px solid white;
      border-radius: 5px;
      font-size: 1rem;
      &:focus {
        color: white;
        background-color: #212121;
        outline-color: #997af0;
        box-shadow: -3px -3px 15px #997af0;
        transition: 0.1s;
        transition-property: box-shadow;
      }
    }
    button {
      background: linear-gradient(to right, #997af0, #08286c);
      padding: 1rem;
      border-radius: 0.5rem;
      border: none;
      color: white;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      text-transform: uppercase;
      transition: 0.4s ease-in-out;
      &:hover {
        box-shadow: -3px -3px 15px #997af0;
      }
    }
    span {
      color: white;
      text-align: center;
      font-size: 1rem;
      a {
        color: #997af0;
        text-decoration: none;
        font-weight: bold;
        &:hover {
          text-shadow: -3px -3px 15px #997af0;
        }
      }
    }
  }
`;

export default Register;
