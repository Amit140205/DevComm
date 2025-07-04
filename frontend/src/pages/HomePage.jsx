import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  getUserFriends,
  getUserRecommendedFriends,
  getOutGoingFriendRequests,
  sendFriendRequest,
} from "../lib/api.js";
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";
import FriendCard from "../components/FriendCard.jsx";
import NoFriendsFound from "../components/NoFriendsFound.jsx";
import {capitalize} from "../lib/utils.js";
import { getLanguageFlag } from "../components/getLanguageFlag.jsx";

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outGoingRequestsIds, setOutGoingRequestsIds] = useState(new Set());

  // getFriends
  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  // console.log(friends)

  // recommendedFriends
  const {
    data: recommendedFriends = [],
    isLoading: loadingRecommendedFriends,
  } = useQuery({
    queryKey: ["recommendedFriends"],
    queryFn: getUserRecommendedFriends,
  });

  // outGoingFriendRequests
  const {
    data: outGoingFriendRequests = [],
    // isLoading: loadingOutGoingFriendRequests,
  } = useQuery({
    queryKey: ["outGoingFriendRequests"],
    queryFn: getOutGoingFriendRequests,
  });
  // console.log(outGoingFriendRequests)

  // sendFriendRequest
  const { mutate, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outGoingFriendRequests"] }),
  });

  //now when friend-request-send, then out-going-friend-request updates
  //then we want to update our out-going-request => useState() (obviously this a set, contains no duplicate values)
  //for that we use useEffect()

  useEffect(() => {
    const outGoingSet = new Set();

    if (outGoingFriendRequests && outGoingFriendRequests.length > 0) {
      outGoingFriendRequests.forEach((req) => {
        // outGoingSet.add(req._id);
        //req._id => does not contain the receipent id
        // console.log(req)
        outGoingSet.add(req.recipient._id)
      });

      setOutGoingRequestsIds(outGoingSet);
    }
  }, [outGoingFriendRequests]);

  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        {/* adding a header => include "your friends and button(link to notification page)" */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Friends
          </h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {/* friends */}
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : //now in the else part checking, does any friends exists
        friends.length === 0 ? (
          <NoFriendsFound
            msg={{
              mainMsg: "No friends yet",
              subMsg: "Connect with others and start exploration",
            }}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

        {/* recommended section */}
        <section>
          {/* header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  Meet New Friends
                </h2>
                <p className="opacity-70">
                  Discover others based on your profile
                </p>
              </div>
            </div>
          </div>

          {/* recommended friends */}
          {loadingRecommendedFriends ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : // if no users available
          recommendedFriends.length === 0 ? (
            <NoFriendsFound
              msg={{
                mainMsg: "No recommendations available",
                subMsg: "Check back later",
              }}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {recommendedFriends.map((user) => {
                //checking request already send or not
                // console.log(user);
                const hasRequestSent = outGoingRequestsIds.has(user._id);

                return (
                  <div
                    key={user._id}
                    className="card bg-base-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="card-body p-5 space-y-4">
                      <div className="flex items-center gap-3">
                        {/* profilePic */}
                        <div className="avatar size-16 rounded-full">
                          <img src={user.profilePic} alt={user.fullName} />
                        </div>

                        {/* fullName,location */}
                        <div>
                          <h3 className="font-semibold text-lg">
                            {user.fullName}
                          </h3>
                          {user.location && (
                            <div className="flex items-center text-xs opacity-70 mt-1">
                              <MapPinIcon className="size-3 mr-1" />
                              {user.location}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* language */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="badge badge-secondary text-xs">
                          {getLanguageFlag(user.nativeLanguage)}
                          Native: {capitalize(user.nativeLanguage)}
                        </span>
                        <span className="badge badge-secondary text-xs">
                          
                          {user.interestTag}
                        </span>
                      </div>

                      {/* bio */}
                      {user.bio && <p className="text-sm opacity-70">{user.bio}</p>}

                      {/* main import button */}
                      <button
                      className={`btn w-full mt-2 ${hasRequestSent? "btn-disabled" : "btn-primary"}`}
                      disabled={hasRequestSent || isPending}
                      onClick={()=>mutate(user._id)}
                      >
                        {hasRequestSent ? (
                          <>
                          <CheckCircleIcon className="mr-2 size-4"/>
                          Request Sent
                          </>
                        ) : (
                          <>
                          <UserPlusIcon className="size-4 mr-2"/>
                          Sent Friend Request
                          </>
                        )}
                      </button>

                    </div>
                  </div>

                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomePage;


