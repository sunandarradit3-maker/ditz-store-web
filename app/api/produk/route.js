// app/api/produk/route.js
import { connectToDatabase } from '@/lib/mongodb';
import Produk from '@/models/Produk';
import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';

export async function GET() {
  await connectToDatabase();
  const produk = await Produk.find().sort({ createdAt: -1 });
  return NextResponse.json(produk);
}

export async function POST(req) {
  const auth = await verifyAdmin(req);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  await connectToDatabase();
  const body = await req.json();
  const produk = await Produk.create(body);
  return NextResponse.json(produk);
}

export async function DELETE(req) {
  const auth = await verifyAdmin(req);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  await connectToDatabase();
  await Produk.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
