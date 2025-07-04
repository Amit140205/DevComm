import { useQueryClient,useQuery, useMutation } from '@tanstack/react-query'
import React from 'react'
import { acceptFriendRequest, getFriendRequests } from '../lib/api.js'
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon } from 'lucide-react'
import NoNotificationsFound from '../components/NoNotificationsFound.jsx'

const NotificationsPage = () => {
  const queryClient = useQueryClient()

  const { data:friendRequests,isLoading } = useQuery({
      queryKey : ["friendRequests"],
      queryFn : getFriendRequests
  })

  const { mutate,isPending } = useMutation({
    mutationFn : acceptFriendRequest,
    onSuccess : ()=>{
      queryClient.invalidateQueries({queryKey : ["friendRequests"]})
      queryClient.invalidateQueries({queryKey : ["friends"]})
    }
  })

  // in friendRequests we receive two things
  // incomingRequests, acceptedRequests

  //to handle edge case => to protect the frontend from crash
  const incomingRequests = friendRequests?.incomingRequests || []
  const acceptedRequests = friendRequests?.acceptedRequests || []

  // test
  // console.log(incomingRequests)
  // console.log(acceptedRequests)

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto max-w-4xl space-y-8'>
        {/* heading */}
        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight mb-6'>Notifications</h1>

        {/* loading */}
        {isLoading ? (
          <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg'></span>
          </div>
        ) : (
          <>
          {/* handling incoming friendRequests */}
          {incomingRequests.length > 0 && (
            <section className='space-y-4'>
              {/* header */}
              <h2 className='text-xl font-semibold flex items-center gap-2'>
                <UserCheckIcon className='h-5 w-5 text-primary'/>
                Friend Requests
                <span className='ml-2 badge badge-primary'>{incomingRequests.length}</span>
              </h2>

              {/* user Info part */}
              <div className='space-y-3'>
                {incomingRequests.map((request)=>(
                  // request
                  <div key={request._id} className='card bg-base-200 shadow-sm hover:shadow-md transition-shadow'>
                    <div className='card-body p-4'>

                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          {/* avatar */}
                          <div className='avatar h-14 w-14'>
                            <img src={request.sender.profilePic} alt={request.sender.fullName} />
                          </div>

                          {/* fullname,language */}
                          <div>
                            <h3 className='font-semibold'>{request.sender.fullName}</h3>
                            <div className='flex flex-wrap gap-1.5 mt-1'>
                              <span className='badge badge-secondary badge-sm'>
                                Native : {request.sender.nativeLanguage}
                              </span>
                              <span className='badge badge-secondary badge-sm'>
                                {request.sender.interestTag}
                              </span>
                            </div>
                          </div>

                        </div>

                        {/* button */}
                        <button className='btn btn-primary btn-sm'
                        onClick={()=>mutate(request._id)}
                        disabled={isPending}
                        >
                          Accept
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* handling accepted friendRequests */}
           {acceptedRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <BellIcon className="h-5 w-5 text-success" />
                  New Connections
                </h2>

                <div className="space-y-3">
                  {acceptedRequests.map((notification) => (
                    <div key={notification._id} className="card bg-base-200 shadow-sm">
                      <div className="card-body p-4">
                        <div className="flex items-start gap-3">
                          <div className="avatar mt-1 size-10 rounded-full">
                            <img
                              src={notification.recipient.profilePic}
                              alt={notification.recipient.fullName}
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{notification.recipient.fullName}</h3>
                            <p className="text-sm my-1">
                              {notification.recipient.fullName} accepted your friend request
                            </p>
                            <p className="text-xs flex items-center opacity-70">
                              <ClockIcon className="h-3 w-3 mr-1" />
                              Recently
                            </p>
                          </div>
                          <div className="badge badge-success">
                            <MessageSquareIcon className="h-3 w-3 mr-1" />
                            New Friend
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* no notifications handle */}
            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <NoNotificationsFound/>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default NotificationsPage