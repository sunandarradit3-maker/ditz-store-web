// app/page.js (tampilan customer)
'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [produk, setProduk] = useState([]);
  const [cart, setCart] = useState({});
  
  useEffect(() => {
    fetch('/api/produk').then(res=>res.json()).then(setProduk);
  }, []);

  const order = async (produkId, jumlah) => {
    const namaPembeli = prompt('Nama Anda?');
    const alamat = prompt('Alamat pengiriman?');
    if (!namaPembeli || !alamat) return;
    await fetch('/api/order', {
      method: 'POST',
      body: JSON.stringify({ produkId, jumlah, namaPembeli, alamat }),
      headers: { 'Content-Type': 'application/json' }
    });
    alert('Order berhasil!');
    window.location.reload();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">DiTz Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {produk.map(p => (
          <div key={p._id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{p.nama}</h2>
            <p>Rp{p.harga}</p>
            <p>Stok: {p.stok}</p>
            <p className="text-sm text-gray-600">{p.deskripsi}</p>
            <input type="number" min="1" max={p.stok} className="border p-1 w-20 mt-2" placeholder="Qty" onChange={e=>setCart({...cart, [p._id]: parseInt(e.target.value)||1})} />
            <button onClick={()=>order(p._id, cart[p._id]||1)} className="bg-blue-600 text-white p-2 mt-2 w-full">Beli</button>
          </div>
        ))}
      </div>
    </div>
  );
  }
