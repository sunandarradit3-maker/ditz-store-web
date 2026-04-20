// app/layout.js
import './globals.css';

export const metadata = {
  title: 'DiTz Store',
  description: 'Toko online resmi DiTz - Belanja mudah, aman, dan terpercaya',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-gray-50 min-h-screen">
        <header className="bg-black text-white p-4 shadow-lg">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-wide">DiTz Store</h1>
            <nav>
              <a href="/" className="hover:text-gray-300 mx-2">Beranda</a>
              <a href="/admin" className="hover:text-gray-300 mx-2">Admin</a>
            </nav>
          </div>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-200 text-center p-4 mt-10">
          &copy; 2024 DiTz Store - All rights reserved.
        </footer>
      </body>
    </html>
  );
    }
