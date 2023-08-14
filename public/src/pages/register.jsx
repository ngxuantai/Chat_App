import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';

function Register() {
  const handleSubmit = (event) => {};

  const handleChange = (event) => {};

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='logo'>
            <img src={logo} alt='logo' />
            <h1>Chat App</h1>
          </div>
          <input
            autoComplete='off'
            type='text'
            name='username'
            placeholder='Username'
            onChange={(event) => handleChange(event)}
          />
          <input
            autoComplete='off'
            type='email'
            name='email'
            placeholder='Email'
            onChange={(event) => handleChange(event)}
          />
          <input
            autoComplete='off'
            type='password'
            name='password'
            placeholder='Password'
            onChange={(event) => handleChange(event)}
          />
          <input
            autoComplete='off'
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            onChange={(event) => handleChange(event)}
          />
          <button type='submit'>Create account</button>
          <span>
            Already have a account? <Link to='/login'>Login</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #08286c;
  .logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-shadow: 0 0 0.5rem black;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: black;
    padding: 3rem 5rem;
    border-radius: 2rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #08286c;
      border-radius: 0.5rem;
      color: white;
      font-size: 1rem;
      &:focus {
        outline: none;
        border: 0.1rem solid #997af0;
      }
    }
    button {
      background-color: #997af0;
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
        background-color: #08286c;
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
      }
    }
  }
`;

export default Register;