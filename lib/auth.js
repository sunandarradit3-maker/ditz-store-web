// lib/auth.js
import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';

export async function verifyAdmin(req) {
  const token = getCookie('admin_token', { req });
  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export function generateToken() {
  return jwt.sign({ admin: true }, process.env.JWT_SECRET, { expiresIn: '1d' });
}
