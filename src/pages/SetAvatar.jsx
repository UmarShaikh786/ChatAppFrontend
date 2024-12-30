import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Loader from '../assets/loader.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvatarRoute } from '../utility/APIroutes';
import { Buffer } from 'buffer';

export default function SetAvatar() {
    const navigate = useNavigate();
    const api = "https://api.multiavatar.com/142345";

    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOption = {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true
    };

    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
        } else {
            fetchAvatars();
        }
    }, [navigate]);

    const fetchAvatars = async () => {
        setIsLoading(true);
        const data = [];
        for (let i = 0; i < 4; i++) {
            const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
            const buffer = new Buffer(image.data);
            data.push(buffer.toString("base64"));
        }
        setAvatars(data);
        setIsLoading(false);
    };

    const setProfilePicture = async () => {
        if (selectedAvatar === undefined) {
            toast.error("Please select an avatar", toastOption);
        } else {
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar]
            });
            if (data.status) {
                user.isAvatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate("/");
            } else {
                toast.error("Error setting avatar. Please try again", toastOption);
            }
        }
    };

    return (
        <>
            {isLoading ? (
                <Container>
                    <img src={Loader} alt='loader' className='loader' />
                </Container>
            ) : (
                <>
                    <Container>
                        <div className="title-container">
                            <h1>Pick an Avatar as your profile Picture</h1>
                        </div>
                        <div className="avatars">
                            {avatars.map((avatar, index) => (
                                <div
                                    key={index}
                                    className={`avatar ${selectedAvatar === index ? 'selected' : ''}`}
                                    onClick={() => setSelectedAvatar(index)}
                                >
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt='avatar' />
                                </div>
                            ))}
                        </div>
                        <button className='submit-btn' onClick={setProfilePicture}>
                            Set as Profile Pic
                        </button>
                    </Container>
                    <ToastContainer />
                </>
            )}
        </>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  padding: 1rem;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
      text-align: center;
      font-size: 1.5rem;
    }
  }

  .avatars {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;

      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #3b0ccc;
    }
  }

  @media screen and (max-width: 720px) {
    gap: 2rem;

    .title-container {
      h1 {
        font-size: 1.2rem;
      }
    }

    .avatars {
      gap: 0.5rem;

      .avatar {
        img {
          height: 4rem;
        }
      }
    }

    .submit-btn {
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
    }
  }
`;
