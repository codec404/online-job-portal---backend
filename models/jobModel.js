import mongoose, { Mongoose } from "mongoose";

const jobSchema = new mongoose.Schema({
    company:{
        type: String,
        require: [true, 'Company name is required']
    },
    position:{
        type:String,
        require: [true, 'Job Position is required'],
        maxlength: 100
    },
    status:{
        type:String,
        enum: ['Pending','Rejected','Interview'],
        default: 'Pending'
    },
    workType:{
        type:String,
        enum: ['Full-time','Part-time','Intern'],
        default: 'Full-time'
    },
    location:{
        type:String,
        default:'Bangalore',
        required: [true, 'Job location is required'], 
    },
    //Getting Object id by mongoose
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},
{timestamps: true})

export default mongoose.model('Job',jobSchema)