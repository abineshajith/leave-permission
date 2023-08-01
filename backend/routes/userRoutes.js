import express from "express";
const router=express.Router();
import { authUser,
    registerUser,
    logoutuser,
    getuserProfile,
    updateUserProfile, 
    leavePermissionPost,
    getLeavePermissionByName} from "../controllers/userController.js";
import { protect } from "../middleware/authmiddleware.js";


router.post('/',registerUser);
router.post('/auth',authUser);
router.post('/logout',logoutuser);
router.route('/profile').get(protect,getuserProfile).put(protect,updateUserProfile);
router.post('/leavepermission',leavePermissionPost)
router.get('/leavepermission/:name', getLeavePermissionByName);



export default router  