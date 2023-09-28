import React, {useState} from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io';
import {BsEmojiSmileFill} from 'react-icons/bs';

export default function ChatInput({handleSendMess}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmojiPickerShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (e) => {
    setMessage((prevMessage) => prevMessage + e.emoji);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.length === 0) return;
    else {
      handleSendMess(message);
      setMessage('');
    }
  };
  return (
    <Container>
      <div className="btn-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerShow} />
          {showEmojiPicker && (
            <Picker
              skinTonesDisabled={true}
              autoFocusSearch={true}
              previewConfig={{
                showPreview: false,
              }}
              onEmojiClick={handleEmojiClick}
            />
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendMessage(e)}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setShowEmojiPicker(false)}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #ffffff;
  padding: 0 1rem;
  paddding-bottom: 0.5rem;
  .btn-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        cursor: pointer;
        font-size: 1.5rem;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -475px;
        border-color: #000000;
        .epr-body::-webkit-scrollbar {
          marging-right: 5px;
          width: 5px;
          &-thumb {
            background-color: #000000;
            border-radius: 5px;
          }
        }
      }
    }
  }
  .input-container {
    padding-left: 1rem;
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    input {
      width: 90%;
      height: 100%;
      padding: 0.6rem 0.8rem;
      background-color: #c7cdcc;
      border: none;
      border-radius: 2rem;
      font-size: 16px;
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.4rem 0.4rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      svg {
        font-size: 1.5rem;
        color: #000000;
      }
    }
  }
`;
