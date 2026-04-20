// app/api/order/route.js
import { connectToDatabase } from '@/lib/mongodb';
import Order from '@/models/Order';
import Produk from '@/models/Produk';
import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';

export async function GET(req) {
  const auth = await verifyAdmin(req);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  await connectToDatabase();
  const orders = await Order.find().populate('produkId').sort({ createdAt: -1 });
  return NextResponse.json(orders);
}

export async function POST(req) {
  await connectToDatabase();
  const body = await req.json();
  const produk = await Produk.findById(body.produkId);
  if (!produk) return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 });
  
  const total = produk.harga * body.jumlah;
  const order = await Order.create({ ...body, total });
  // kurangi stok
  produk.stok -= body.jumlah;
  await produk.save();
  return NextResponse.json(order);
}

export async function PUT(req) {
  const auth = await verifyAdmin(req);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const body = await req.json();
  await connectToDatabase();
  const order = await Order.findByIdAndUpdate(body.id, { status: body.status }, { new: true });
  return NextResponse.json(order);
}
