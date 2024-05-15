import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './ModeToggle';

const MainNav = () => {
  return (
    <nav className="flex flex-col items-center border-b p-4">
      <div className="max-w-6xl w-full">
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <Link href="/">Dashboard</Link>
            <Link href="/tickets">Tickets</Link>
            <Link href="/users">Users</Link>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/">Login</Link>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
