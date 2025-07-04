import { CallControls, CallingState, SpeakerLayout, StreamTheme, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { useNavigate } from 'react-router'


const CallContent = () => {
    const {useCallCallingState} = useCallStateHooks()
    const callingState = useCallCallingState()

    const navigate = useNavigate()

    if(callingState === CallingState.LEFT) return navigate("/")
    return (
        <div>
            <StreamTheme>
                <SpeakerLayout/>
                <CallControls/>
            </StreamTheme>
        </div>
    )
}

export default CallContent