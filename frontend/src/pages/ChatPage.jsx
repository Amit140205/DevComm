import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useAuthHook from '../hooks/useAuthHook.js'
import { useQuery } from '@tanstack/react-query'
import { getStreamToken } from '../lib/api.js'

import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import { StreamChat } from 'stream-chat'
import toast from 'react-hot-toast'
import ChatLoader from '../components/ChatLoader.jsx'
import VideoCallButton from '../components/VideoCallButton.jsx'

// stream api key
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

const ChatPage = () => {
  //retrieving 
  const {id : targetUserId} = useParams()
  // console.log(targetUserId)

  const [chatClient,setChatClient] = useState(null)
  const [chatChannel,setChatChannel] = useState(null)
  const [loading,setLoading] = useState(true)

  //authUser
  const {authUser} = useAuthHook()

  //getStreamToken for chatting
  //now we want that => getStreamToken function runs only then authUser is available
  const {data : tokenData } = useQuery({
    queryKey : ["getStreamToken"],
    queryFn : getStreamToken,
    enabled : !!authUser
  })

  //useEffect for setup
  useEffect(()=>{
    const initChat = async () => {
        if(!tokenData?.token || !authUser) return

        try{
          console.log("Initializing stream chat client...")

          const client = StreamChat.getInstance(STREAM_API_KEY)

          await client.connectUser({
            id : authUser._id,
            name : authUser.fullName,
            image : authUser.profilePic
          }, tokenData.token)
          
          const channelId = [authUser._id,targetUserId].sort().join("-")
          // meaning
          // myId = 12, yourId = 34
          // if I start the chat then [12,34], if you start the chat then becomes [34,12]
          // different channel => causing error, sort() makes it consistent from both ends

          const currentChannel = client.channel("messaging",channelId,
            {
              members : [authUser._id,targetUserId]
            }
          )

          await currentChannel.watch()

          setChatClient(client)
          setChatChannel(currentChannel)
        }catch(error){
          console.log("Error during initializing chat : ",error)
          toast.error("can not connect to chat, please try again")
        }finally{
          setLoading(false)
        }
    }

    initChat()
  },[tokenData,authUser,targetUserId])

  const handleVideoCall =  () => {
    // here we have to create a url and send that url to the chat-channel
    // users clicks and join
    // ${window.location.origin} => localhost:5173
    // current window location, by taping it, we can go to a new tab
    if(chatChannel){
      const videoCallUrl = `${window.location.origin}/call/${chatChannel.id}`

      //sending the url to the channel
      chatChannel.sendMessage({
        text : `I have started a video call. Join me here ${videoCallUrl}`
      })

      toast.success("Video call link sent successfully")
    }
  }

  if(loading || !chatClient || !chatChannel) return <ChatLoader/>

  return (
    <div className='h-[93vh]'>
      <Chat client={chatClient}>
        <Channel channel={chatChannel}>

          <div className='w-full relative'>
            <VideoCallButton handleVideoCall={handleVideoCall}/>
            <Window>
              <ChannelHeader/>
              <MessageList/>
              <MessageInput focus/>
            </Window>
          </div>
          <Thread/>
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage