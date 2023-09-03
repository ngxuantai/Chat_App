import React, {useState, useEffect} from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import {signupUser} from '../services/userApi';

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

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleValidation = () => {
    const {username, email, password, confirmPassword} = values;
    if (username.length < 3) {
      toast.error('Username must be at least 3 characters.', toastOptions);
      return false;
    } else if (email === '') {
      toast.error('Email is required.', toastOptions);
      return false;
    } else if (!isValidEmail(email)) {
      toast.error('Email is invalid.', toastOptions);
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
      const {data} = await signupUser({username, email, password});
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
      <FormContainer>
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1>Chat App</h1>
          {/* <h2>To Chat App</h2> */}
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
          <button type="submit">Sign up</button>
          <span>
            Have an account? <Link to="/login">Log in</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 6rem;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f2f5;
  .logo {
    display: flex;
    align-items: center;
    flex-direction: column;
    img {
      height: 16rem;
    }
    h1 {
      background: -webkit-linear-gradient(#997af0, #08286c);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0px;
      font-family: Helvetica, Arial, sans-serif;
      font-size: 4rem;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 2rem 2rem;
    border-radius: 0.75rem;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
    input {
      width: 220px;
      padding: 10px;
      border: 1px solid #000;
      border-radius: 5px;
      font-size: 1rem;
      &:focus {
        outline-color: #997af0;
        box-shadow: -3px -3px 15px #997af0;
        transition: 0.1s;
        transition-property: box-shadow;
      }
    }
    button {
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
    span {
      color: black;
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
