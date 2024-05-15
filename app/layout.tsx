import type { Metadata } from 'next';
import './globals.css';
import MainNav from '@/components/MainNav';

export const metadata: Metadata = {
  title: 'Ticketing App',
  description: 'Ticketing app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainNav />
        <main className="flex flex-col items-center p-4">
          <div className="max-w-6xl w-full">{children}</div>
        </main>
      </body>
    </html>
  );
}
