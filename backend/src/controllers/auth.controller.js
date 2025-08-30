// controllers/auth.controller.js
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signAccess, signRefresh, verifyRefresh } from '../utils/tokens.js';


const setRefreshCookie = (res, token) => {
res.cookie('refreshToken', token, {
httpOnly: true,
sameSite: 'lax',
secure: process.env.NODE_ENV === 'production',
maxAge: 7 * 24 * 60 * 60 * 1000,
});
};


export const register = async (req, res) => {
const { name, email, password, role } = req.body;
const exists = await User.findOne({ email });
if (exists) return res.status(409).json({ message: 'Email already in use' });
const hash = await bcrypt.hash(password, 12);
const user = await User.create({ name, email, password: hash, role });
const access = signAccess({ id: user._id, role: user.role });
const refresh = signRefresh({ id: user._id, role: user.role });
setRefreshCookie(res, refresh);
return res.status(201).json({ accessToken: access, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};


export const login = async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email }).select('+password');
if (!user) return res.status(401).json({ message: 'Invalid credentials' });
const ok = await bcrypt.compare(password, user.password);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
const access = signAccess({ id: user._id, role: user.role });
const refresh = signRefresh({ id: user._id, role: user.role });
setRefreshCookie(res, refresh);
return res.json({ accessToken: access, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};


export const refreshToken = async (req, res) => {
const token = req.cookies.refreshToken;
if (!token) return res.status(401).json({ message: 'No refresh token' });
try {
const payload = verifyRefresh(token);
const access = signAccess({ id: payload.id, role: payload.role });
return res.json({ accessToken: access });
} catch (e) {
return res.status(401).json({ message: 'Invalid refresh token' });
}
};


export const logout = async (_req, res) => {
res.clearCookie('refreshToken');
return res.json({ message: 'Logged out' });
};