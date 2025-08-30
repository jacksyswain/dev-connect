import mongoose from 'mongoose';


const CompanySchema = new mongoose.Schema({
owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
name: { type: String, required: true },
website: String,
logoUrl: String,
description: String,
locations: [String],
}, { timestamps: true });


export default mongoose.model('Company', CompanySchema);