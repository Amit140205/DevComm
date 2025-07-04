import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthHook from "../hooks/useAuthHook.js";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api.js";

import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  
  
  StreamTheme,
} from '@stream-io/video-react-sdk';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader.jsx";
import CallContent from "../components/CallContent.jsx";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

const CallPage = () => {
  const { id: videoCallId } = useParams();

  const [client, setClient] = useState(null);
  const [videoCall, setVideoCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoading } = useAuthHook();

  const { data: tokenData } = useQuery({
    queryKey: ["getStreamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData.token || !authUser || !videoCallId) return null;

      try{
        console.log("Initializing stream video-call client....")

        const user = {
          id : authUser._id,
          name : authUser.fullName,
          image : authUser.profilePic
        }

        const videoClient = new StreamVideoClient({
          apiKey : STREAM_API_KEY,
          user,
          token : tokenData.token
        })

        const videoCallInstance = videoClient.call("default",videoCallId)

        await videoCallInstance.join({create:true})

        console.log("joined the video call successfully")

        setClient(videoClient)
        setVideoCall(videoCallInstance)
      }catch(error){
        console.log("Error in joining the call : ", error)
        toast.error("Can not connect to video-call, please try again")
      }finally{
        setIsConnecting(false)
      }
    };

    initCall();
  }, [tokenData,authUser,videoCallId]);

  if (isLoading || isConnecting) return <PageLoader/>

  return <div className="h-screen flex flex-col items-center justify-center">
    <div className="relative">
      {client && videoCall ? (
        <StreamVideo client={client}>
          <StreamCall call={videoCall}>
            {/* we have make this component */}
            <CallContent/>
          </StreamCall>
        </StreamVideo>
      ) : (
        <div className="flex justify-center items-center h-screen">
        <p>Could not initialize to video-call, please try again</p>
        </div>
      )}
    </div>
  </div>;
};

export default CallPage;
