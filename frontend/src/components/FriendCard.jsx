import React from 'react'
import { LANGUAGE_TO_FLAG } from '../constants'
import { Link } from 'react-router'
import { getLanguageFlag } from './getLanguageFlag.jsx'


const FriendCard = ({friend}) => {
  return (
    <div className='card bg-base-200 hover:shadow-md transition-shadow'>
        <div className='card-body p-4'>

            {/* profilePic and fullName */}
            <div className='flex items-center gap-3 mb-3'>
                <div className='avatar size-12'>
                    <img src={friend.profilePic} alt={friend.fullName} />
                </div>
                <h3 className='font-semibold truncate'>{friend.fullName}</h3>
            </div>
            {/* language */}
            <div className='flex flex-wrap gap-1.5 mb-3'>
                <span className='badge badge-secondary text-xs'>
                    {getLanguageFlag(friend.nativeLanguage)}
                    Native: {friend.nativeLanguage}
                </span>
                <span className='badge badge-secondary text-xs'>
                    
                    {friend.interestTag}
                </span>
            </div>

            {/* link */}
            <Link to={`/chat/${friend._id}`} className='btn btn-outline w-full'>Message</Link>
        </div>
    </div>
  )
}

export default FriendCard



