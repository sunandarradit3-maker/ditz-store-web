// models/Produk.js
import mongoose from 'mongoose';

const ProdukSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  harga: { type: Number, required: true },
  stok: { type: Number, default: 0 },
  gambar: { type: String, default: '' },
  deskripsi: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Produk || mongoose.model('Produk', ProdukSchema);
