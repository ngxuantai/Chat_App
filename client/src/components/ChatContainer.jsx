import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import {sendMessage, getAllMessages} from '../services/messageApi';

export default function ChatContainer({currentChat, currentUser, socket}) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = React.useRef();

  useEffect(() => {
    (async () => {
      const dataMessage = await getAllMessages({
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(dataMessage.data);
    })();
  }, [currentChat]);

  const handleSendMess = async (message) => {
    const data = await sendMessage({
      from: currentUser._id,
      to: currentChat._id,
      message: message,
    });
    socket.current.emit('send-mess', {
      from: currentUser._id,
      to: currentChat._id,
      message: message,
    });
    setMessages((prevMessages) => [
      {
        fromSelf: true,
        message: message,
      },
      ...prevMessages,
    ]);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('receive-mess', (message) => {
        setArrivalMessage({
          fromSelf: false,
          message: message,
        });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages([arrivalMessage, ...messages]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-infor">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div>
              <div
                className={`message ${message.fromSelf ? 'sent' : 'recieved'}`}
              >
                <div className="message-content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMess={handleSendMess} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  overflow: hidden;
  // @media screen and (min-width: 720px) and (max-width: 1080px) {
  //   grid-template-rows: 15% 70% 15%;
  // }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    border-bottom: 0.5px solid #b8b8b8;
    .user-infor {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 1rem;
    overflow-y: auto;
    display: flex;
    flex: 1;
    flex-direction: column-reverse;
    gap: 1.5px;
    .message {
      display: flex;
      align-items: center;
      gap: 1rem;
      .message-content {
        display: flex;
        align-items: center;
        padding: 0.6rem 1rem;
        background-color: #f1f0f0;
        border-radius: 1.5rem;
        max-width: 60%;
        overflow-wrap: break-word;
        p {
          display: flex;
          margin: 0;
          margin-top: 0;
          font-size: 16px;
          line-height: 1;
        }
      }
    }
    .sent {
      justify-content: flex-end;
      .message-content {
        background-color: #00bfa5;
        color: #ffffff;
      }
    }
    .recieved {
      justify-content: flex-start;
      .message-content {
        background-color: #c7cdcc;
        color: #000000;
      }
    }
  }
`;
