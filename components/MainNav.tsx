import Link from 'next/link';
import React from 'react';

const MainNav = () => {
  return (
    <nav className="flex flex-col items-center border-b p-4">
      <div className="max-w-6xl w-full">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Link href="/">Dashboard</Link>
            <Link href="/tickets">Tickets</Link>
            <Link href="/users">Users</Link>
          </div>
          <div className="flex gap-4">
            <Link href="/">Login</Link>
            <Link href="/">Dark</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
