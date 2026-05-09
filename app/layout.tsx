import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Agency CRM',
  description: 'Life Insurance Recruiting and Pipeline Management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 font-sans antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1 w-full relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}