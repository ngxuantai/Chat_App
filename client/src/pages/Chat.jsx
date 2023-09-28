import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import robot from '../assets/robot.gif';
import {getAllUser} from '../services/userApi';
import Contacts from '../components/Contacts';
import ChatContainer from '../components/ChatContainer';

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [userName, setUserName] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem('chatapp-user')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chatapp-user')));
        setUserName(
          await JSON.parse(localStorage.getItem('chatapp-user')).username
        );
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await getAllUser();
          setContacts(data.data);
        } else {
          navigate('/setAvatar');
        }
      }
    })();
  }, [currentUser]);
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {currentChat === undefined ? (
          <>
            <div className="welcome">
              <img src={robot} alt="robot-welcome" />
              <h1>
                Welcome, <span>{userName}!</span>
              </h1>
              <h3>Please select a chat</h3>
            </div>
          </>
        ) : (
          <ChatContainer currentChat={currentChat} />
        )}
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #131324;
  .container {
    height: 100vh;
    width: 100vw;
    background-color: #ffffff;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
  .welcome {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      height: 20rem;
    }
    h1,
    h3 {
      margin: 0;
    }
  }
`;

export default Chat;
