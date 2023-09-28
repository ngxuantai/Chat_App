import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.png';

export default function Contacts({contacts, currentUser, changeChat}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserAvatar, setCurrentUserAvatar] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserAvatar(currentUser.avatarImage);
    }
  }, [currentUser]);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserName && currentUserAvatar && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Chat App</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? 'selected' : ''
                  }`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserAvatar}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h3>{currentUserName}</h3>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #ffffff;
  border-right: 0.5px solid #b8b8b8;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    // height: 65px;
    img {
      height: 3rem;
    }
    h3 {
      text-transform: uppercase;
    }
  }
  .contacts {
    padding-top: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #b8b8b8;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      min-height: 5rem;
      width: 100%;
      cursor: pointer;
      // border-radius: 0.2rem;
      display: flex;
      gap: 0.8rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        margin-left: 1rem;
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          font-size: 1rem;
        }
      }
    }
    .selected {
      background-color: #d7d7d7;
    }
  }
  .current-user {
    background-color: #c7cdcc;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
  }
`;
