import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    currentdate:{
        type:Date,
        default:Date.now
    },
    fromdate:{
        type:Date,
        require:true
    },
    todate:{
        type:Date,
        require:true
    },
    leavetype:{
        type:String,
        require:true
    },
    reason:{
        type:String,
        require:true
    },
    totalleave:{
        type:Number,
        require:true
    }
});

const leavePermission = mongoose.model('leavePermission', userSchema);

export default leavePermission;