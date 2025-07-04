import React from 'react'

const NoFriendsFound = ({msg}) => {
  const {mainMsg,subMsg} = msg
  return (
    <div className='card bg-base-200 p-6 text-center'>
        <h3 className='font-semibold text-lg mb-2'>{mainMsg}</h3>
        <p className='text-base-content opacity--70'>
            {subMsg}
        </p>
    </div>
  )
}

export default NoFriendsFound