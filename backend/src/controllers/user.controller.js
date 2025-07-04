import { User } from "../models/User.model.js"
import { FriendRequest } from "../models/FriendRequest.model.js"

export const getRecommendedUsers = async (req,res) => {
    try{
        const currentUserId = req.user._id
        const currentUser = req.user

        const recommendedUsers = await User.find({
            $and : [
                {_id : {$ne : currentUserId}},
                {_id : {$nin : currentUser.friend}},
                {isOnBoarded : true}
            ]
        })

        return res.status(200).json({success:true,recommendedUsers})
    }catch(error){
        console.log("Error in getRecommendedUsers controller : ", error.message)
        return res.status(500).json({message:"internal server error"})
    }
}

export const getMyFriends = async (req,res) => {
    try{
        // console.log(req.user)

        const user = await User.findById(req.user._id)
        .select("friend")
        .populate("friend","fullName profilePic nativeLanguage interestTag")

        // console.log(user.friend)

        return res.status(200).json(user.friend)
    }catch(error){
        console.log("Error in getMyFriends controller : ",error.message)
        return res.status(500).json({message:"internal server error"})
    }
}

export const sendFriendRequest = async (req,res) => {
    try{
        const myId = req.user._id
        const {id:recipientId} = req.params

        if(myId === recipientId){
            return res.status(400).json({message:"you can not send friend request to yourself"})
        }

        const recipient = await User.findById(recipientId)
        if(!recipient){
            return res.status(404).json({message:"receipent not found"})
        }

        //already friends
        if(recipient.friend.includes(myId)){
            return res.status(400).json({message:"already friends"})
        }

        //check previously a request send or not
        const existingRequest = await FriendRequest.findOne(
            {
                $or : [
                    {sender : myId, recipient : recipientId},
                    {sender : recipientId, recipient : myId}
                ]
            }
        )

        if(existingRequest){
            return res.status(400).json({message:"request already exists between sender and receipent"})
        }

        const friendRequest = await FriendRequest.create({
            sender : myId,
            recipient : recipientId
        })

        if(!friendRequest){
            return res.status(400).json({message:"error while creating friend request"})
        }

        return res.status(201).json(friendRequest)
    }catch(error){
        console.log("Error in sendFriendRequest route : ",error.message)
        return res.status(500).json({message:"internal server error"})
    }
}

export const acceptFriendRequest = async (req,res) => {
    try {
        const {id : senderId} = req.params
    
        const friendRequest = await FriendRequest.findById(senderId)
    
        if(!friendRequest){
            return res.status(404).json({message : "friend request not found"})
        }

        console.log(friendRequest.recipient.toString() != req.user._id)

        //verify the current user is the receipent or not
        if(friendRequest.recipient.toString() != req.user._id){
            return res.status(403).json({message : "unathorized access to accept the request"})
        }
    
        friendRequest.status = "accepted"
        await friendRequest.save()

        //now add each to other's friend array
        //$addToSet : add element to the array if the element already does not exist
        await User.findByIdAndUpdate(friendRequest.sender,
            {
                $addToSet : {friend : friendRequest.recipient}
            }
        )

        await User.findByIdAndUpdate(friendRequest.recipient,
            {
                $addToSet : {friend : friendRequest.sender}
            }
        )

        res.status(200).json({message : "friend request accepted"})
    } catch (error) {
        console.log("Error in acceptFriendRequest controller : ",error.message)
        res.status(500).json({message : "internal server error"})
    }
}

export const getFriendRequests = async (req,res) => {
    try{
        const incomingRequests = await FriendRequest.find({
            recipient : req.user._id,
            status : "pending"
        }).populate("sender","fullName profilePic nativeLanguage interestTag")

        const acceptedRequests = await FriendRequest.find({
            sender : req.user._id,
            status : "accepted"
        }).populate("recipient", "fullName profilePic")

       return res.status(200).json({incomingRequests,acceptedRequests})
    }catch(error){
        console.log("Error in getFriendRequests controller : ",error.message)
        return res.status(500).json({message : "internal server error"})
    }
}

export const getOngoingFriendRequests = async (req,res) => {
    try{
        const onGoingRequests = await FriendRequest.find({
            sender : req.user._id,
            status : "pending"
        }).populate("recipient","fullName profilePic nativeLanguage interestTag")

        return res.status(200).json(onGoingRequests)
    }catch(error){
        console.log("Error in getOngoingFriendRequests controller : ",error.message)
        return res.status(500).json({message : "internal server error"})
    }
}