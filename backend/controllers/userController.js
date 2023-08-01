import AsyncHandler from "express-async-handler"
import User from "../models/models.js";
import generateToken from "../utils/generatetoken.js";
import leavePermission from "../models/leavepermodule.js";
import moment from "moment/moment.js";



// @des Auth user/set token
//router POST /api/user/auth
const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  } 
});
 

// @des Register new user
//router POST /api/user
const registerUser = AsyncHandler(async (req, res) => {
    const { name, email,phone, password,country } = req.body;
  
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400); 
      throw new Error('User already exists');
    }
  
    const user = await User.create({
      name,
      email,
      password,
      phone,
      country
    });
  
    if (user) {
        generateToken(res,user._id);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone:user.phone,
        country:user.country
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });


// @des logout get user 
//router POST /api/user/logout  
const logoutuser = AsyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out' });
});



// @des logout get user
//router POST /api/user/profile  
const getuserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Unable to fetch user profile' });
  }
};





// @des logout get user
//router POST /api/user/prifile  



const updateUserProfile = AsyncHandler(async (req, res) => {
  console.log('Updating user profile');

  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    const response = {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    };

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(response));
  } else {
    console.log('User not found');
    res.status(404);
    throw new Error('User not found');
  }
});




const leavePermissionPost = AsyncHandler(async (req, res) => {
  const { name,fromdate, todate, leavetype, reason,totalleave } = req.body;
  const leaveReq = await leavePermission.create({
    name,
    fromdate,
    todate,
    leavetype,
    reason,
    totalleave
  });
  if (leaveReq) {
    res.status(201).json({ message: 'Leave request submitted successfully', data: leaveReq });
  } else {
    res.status(400);
    throw new Error('Failed to submit leave request');
  }
});

const getLeavePermissionByName = async (req, res) => {
  try { 
    const { name } = req.params;
    const leavePermissions = await leavePermission.find({ name });

    if (leavePermissions.length === 0) {
      return res.status(404).json({
        message: "No leave permissions found for the given name",
        data: null,
      });
    }

    res.status(200).json({
      message: "Leave permissions retrieved successfully",
      data: leavePermissions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export{ 
    authUser,
    registerUser,
    logoutuser,
    getuserProfile,
    updateUserProfile,
    leavePermissionPost,
    getLeavePermissionByName
}