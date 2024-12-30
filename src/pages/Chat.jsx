import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { allUsersRoute } from '../utility/APIroutes'
import { host } from '../utility/APIroutes'
import { useNavigate } from 'react-router-dom'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import { io } from 'socket.io-client'

function Chat() {
    const socket = useRef()
    const navigate = useNavigate()
    const [contacts, setContacts] = useState([])
    const [currentUser, setCurrentUser] = useState()
    const [currentChat, setCurrentChat] = useState()
    const [error, setError] = useState(null) // Error state

    useEffect(() => {
        if (!localStorage.getItem("chat-app-user")) {
            navigate("/login")
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")))
        }
    }, [navigate])

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host)
            socket.current.emit("add-user", currentUser._id)
        }
    }, [currentUser])

    useEffect(() => {
        const getData = async () => {
            if (currentUser) {
                try {
                    if (currentUser.isAvatarImageSet) {
                        const { data } = await axios.get(`${allUsersRoute}/${currentUser._id}`)
                        setContacts(data)
                    } else {
                        navigate("/setAvatar")
                    }
                } catch (err) {
                    setError("Failed to fetch contacts. Please try again later.")
                    console.error("Network error:", err)
                }
            }
        }
        getData()
    }, [currentUser, navigate])

    const handleChatChange = (chat) => {
        setCurrentChat(chat)
    }

    return (
        <Container>
            {error && <ErrorMessage>{error}</ErrorMessage>} {/* Display error */}
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
                {
                    currentChat === undefined
                        ? (<Welcome currentUser={currentUser} />)
                        : (<ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket} />)
                }
            </div>
        </Container>
    )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ff4d4d;
  background-color: #ffe6e6;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export default Chat
