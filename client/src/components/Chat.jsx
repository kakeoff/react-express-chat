import React from 'react'
import { useEffect } from 'react'
import io from 'socket.io-client'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

const socket = io.connect('http://localhost:4000')
const Chat = () => {
  const { search } = useLocation()

  const [params, setParams] = useState(null)

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search))

    setParams(searchParams)

    socket.emit('join', searchParams)
  }, [search])

  useEffect(() => {
    socket.on('message', ({ data }) => {
      console.log(data)
    })
  }, [])

  console.log(params)
  return <div>Chat</div>
}

export default Chat
