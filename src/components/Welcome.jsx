import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';

function Welcome({ currentUser }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getUsername = async () => {
      const storedUser = JSON.parse(localStorage.getItem("chat-app-user"));
      if (storedUser && storedUser.username) {
        setUserName(storedUser.username);
      }
    };
    getUsername();
  }, []);

  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{userName ? userName : 'User'}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  text-align: center; /* Center-align text for better mobile appearance */

  img {
    height: 20rem;
    max-width: 90%; /* Ensure the image scales down on smaller screens */
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2rem;
    margin: 0.5rem 0;
  }

  h3 {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }

  span {
    color: #4e00ff;
  }

  @media (max-width: 768px) {
    img {
      height: 15rem;
    }

    h1 {
      font-size: 1.5rem;
    }

    h3 {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    img {
      height: 10rem;
    }

    h1 {
      font-size: 1.2rem;
    }

    h3 {
      font-size: 0.9rem;
    }
  }
`;

export default Welcome;
