import React from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';

export default function ChatContainer({currentChat}) {
  const handleSendMess = async (message) => {
    alert(message);
  };
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
      <div className="chat-messages"></div>
      <ChatInput handleSendMess={handleSendMess} />
    </Container>
  );
}

const Container = styled.div`
  padding-top: 1rem;
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
`;
