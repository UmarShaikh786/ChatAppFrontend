import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Logo from "../assets/logo.svg";

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState();
  const [currentUserImage, setCurrentUserImage] = useState();
  const [currentSelected, setCurrentSelected] = useState();

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${index === currentSelected ? 'selected' : ''}`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
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
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  height: 100vh; /* Ensures the sidebar covers the full screen */

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
      font-size: 1.2rem;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    gap: 0.8rem;

    &::-webkit-scrollbar {
      width: 0.3rem;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ffffff39;
      border-radius: 1rem;
    }

    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.5rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.3s ease-in-out;

      &:hover {
        background-color: #3f51b5;
      }

      .avatar {
        img {
          height: 3rem;
          border-radius: 50%;
        }
      }

      .username {
        h3 {
          color: white;
          font-size: 1.1rem;
        }
      }

      &.selected {
        background-color: #4caf50;
      }
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    padding: 1rem;

    .avatar {
      img {
        height: 4rem;
        border-radius: 50%;
      }
    }

    .username {
      h2 {
        color: white;
        font-size: 1.5rem;
      }
    }
  }

  /* Tablet View */
  @media screen and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;

    .brand {
      img {
        height: 1.8rem;
      }
      h3 {
        font-size: 1rem;
      }
    }

    .contacts {
      gap: 0.6rem;

      .contact {
        min-height: 4.5rem;
        padding: 0.3rem;
        .avatar {
          img {
            height: 2.5rem;
          }
        }
        .username {
          h3 {
            font-size: 1rem;
          }
        }
      }
    }

    .current-user {
      gap: 1.5rem;

      .avatar {
        img {
          height: 3.5rem;
        }
      }

      .username {
        h2 {
          font-size: 1.2rem;
        }
      }
    }
  }

  /* Mobile View */
  @media screen and (max-width: 720px) {
    grid-template-rows: 15% 70% 15%;

    .brand {
      gap: 0.5rem;

      img {
        height: 1.5rem;
      }

      h3 {
        font-size: 0.9rem;
      }
    }

    .contacts {
      gap: 0.5rem;

      .contact {
        min-height: 4rem;
        gap: 0.5rem;
        padding: 0.2rem;

        .avatar {
          img {
            height: 2rem;
          }
        }

        .username {
          h3 {
            font-size: 0.9rem;
          }
        }
      }
    }

    .current-user {
      gap: 1rem;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;



export default Contacts;
