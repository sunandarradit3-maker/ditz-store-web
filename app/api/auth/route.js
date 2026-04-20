// app/api/auth/route.js
import { NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth';
import { setCookie } from 'cookies-next';

export async function POST(req) {
  const { password } = await req.json();
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
  }
  const token = generateToken();
  const response = NextResponse.json({ success: true });
  setCookie('admin_token', token, { req, res: response, httpOnly: true, maxAge: 86400 });
  return response;
}
