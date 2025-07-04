import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getUserFriends } from '../lib/api.js'
import NoFriendsFound from '../components/NoFriendsFound.jsx'
import FriendCard from '../components/FriendCard.jsx'

const FriendsPage = () => {
  //getFriends
  const {data : friends,isLoading} = useQuery({
    queryKey : ["friends"],
    queryFn : getUserFriends
  })
  // console.log(friends)

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto space-y-10'>
        {/* header */}
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          </div>

          {/* friends */}
          {isLoading ? (
            <div className='flex justify-center py-12'>
              <span className='loading loading-spinner loading-lg'/>
            </div>
          ) : (
            friends.length === 0 ? (
              <NoFriendsFound msg={{
                mainMsg: "No friends yet",
                subMsg: "Connect with others and start exploration",
              }}/>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {friends.map((friend)=>(
                  <FriendCard key={friend._id} friend={friend}/>
                ))}
              </div>
            )
          )}

      </div>
    </div>
  )
}

export default FriendsPage