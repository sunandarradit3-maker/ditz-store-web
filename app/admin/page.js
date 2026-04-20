// app/admin/page.js
'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [produk, setProduk] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({ nama: '', harga: '', stok: '', deskripsi: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  const login = async () => {
    const res = await fetch('/api/auth', { method: 'POST', body: JSON.stringify({ password }), headers: { 'Content-Type': 'application/json' } });
    if (res.ok) setIsLoggedIn(true);
    else alert('Password salah');
  };

  const fetchData = async () => {
    const resProduk = await fetch('/api/produk');
    const resOrders = await fetch('/api/order');
    setProduk(await resProduk.json());
    setOrders(await resOrders.json());
  };

  const addProduk = async () => {
    await fetch('/api/produk', { method: 'POST', body: JSON.stringify(form), headers: { 'Content-Type': 'application/json' } });
    fetchData();
    setForm({ nama: '', harga: '', stok: '', deskripsi: '' });
  };

  const deleteProduk = async (id) => {
    await fetch(`/api/produk?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  const updateStatus = async (id, status) => {
    await fetch('/api/order', { method: 'PUT', body: JSON.stringify({ id, status }), headers: { 'Content-Type': 'application/json' } });
    fetchData();
  };

  useEffect(() => {
    if (isLoggedIn) fetchData();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Login Admin DiTz Store</h1>
        <input type="password" placeholder="Password" className="border p-2 w-full mb-2" value={password} onChange={e=>setPassword(e.target.value)} />
        <button onClick={login} className="bg-blue-600 text-white p-2 w-full">Login</button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin DiTz Store</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Tambah Produk</h2>
          <input className="border p-2 w-full mb-2" placeholder="Nama" value={form.nama} onChange={e=>setForm({...form, nama:e.target.value})} />
          <input className="border p-2 w-full mb-2" placeholder="Harga" type="number" value={form.harga} onChange={e=>setForm({...form, harga:e.target.value})} />
          <input className="border p-2 w-full mb-2" placeholder="Stok" type="number" value={form.stok} onChange={e=>setForm({...form, stok:e.target.value})} />
          <textarea className="border p-2 w-full mb-2" placeholder="Deskripsi" value={form.deskripsi} onChange={e=>setForm({...form, deskripsi:e.target.value})} />
          <button onClick={addProduk} className="bg-green-600 text-white p-2 w-full">Tambah Produk</button>
          
          <h2 className="text-xl font-semibold mt-6 mb-3">Daftar Produk</h2>
          {produk.map(p => (
            <div key={p._id} className="border p-2 mb-2 flex justify-between">
              <div><strong>{p.nama}</strong> - Rp{p.harga} (stok: {p.stok})</div>
              <button onClick={()=>deleteProduk(p._id)} className="bg-red-500 text-white px-2">Hapus</button>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-3">Pantau Orderan</h2>
          {orders.map(o => (
            <div key={o._id} className="border p-3 mb-3">
              <div><strong>{o.produkId?.nama}</strong> x {o.jumlah} = Rp{o.total}</div>
              <div>Pembeli: {o.namaPembeli}</div>
              <div>Status: 
                <select value={o.status} onChange={e=>updateStatus(o._id, e.target.value)} className="ml-2 border">
                  <option value="pending">Pending</option>
                  <option value="diproses">Diproses</option>
                  <option value="dikirim">Dikirim</option>
                  <option value="selesai">Selesai</option>
                  <option value="batal">Batal</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
            }
