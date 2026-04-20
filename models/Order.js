// models/Order.js
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  produkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Produk', required: true },
  namaPembeli: String,
  alamat: String,
  jumlah: Number,
  total: Number,
  status: { type: String, default: 'pending', enum: ['pending', 'diproses', 'dikirim', 'selesai', 'batal'] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
