import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js"
import { getRecommendedUsers,getMyFriends,sendFriendRequest,acceptFriendRequest,getFriendRequests,getOngoingFriendRequests } from "../controllers/user.controller.js"
const router = express.Router()

// router.get("/",protectRoute,getRecommendedUsers)
// router.get("/friends",protectRoute,getMyFriends)
// instead of declaring middleware every single time
// we can use

router.use(protectRoute)

router.get("/",getRecommendedUsers)
router.get("/friends",getMyFriends)

router.post("/friend-request/:id",sendFriendRequest)
router.put("/friend-request/:id/accept",acceptFriendRequest)

router.get("/friend-requests",getFriendRequests)

router.get("/ongoing-friend-requests",getOngoingFriendRequests)

export default router