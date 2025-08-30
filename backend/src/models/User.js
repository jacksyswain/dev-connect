import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
name: { type: String, required: true, trim: true },
email: { type: String, required: true, unique: true, lowercase: true },
password: { type: String, required: true, select: false },
role: { type: String, enum: ['EMPLOYER', 'JOB_SEEKER'], required: true },
emailVerified: { type: Boolean, default: false },
savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
savedCandidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
}, { timestamps: true });


export default mongoose.model('User', UserSchema);