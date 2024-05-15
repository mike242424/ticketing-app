'use client';

import Link from 'next/link';
import React from 'react';
import { ModeToggle } from './ModeToggle';
import { usePathname } from 'next/navigation';

const MainNav = () => {
  const pathname = usePathname();
  const links = [
    { title: 'Dashboard', path: '/' },
    { title: 'Tickets', path: '/tickets' },
    { title: 'Users', path: '/users' },
  ];

  return (
    <nav className="flex flex-col items-center border-b p-4">
      <div className="max-w-6xl w-full">
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            {links.map((link) => (
              <Link
                key={link.title}
                className={`nav-link ${
                  pathname === link.path ? 'font-bold cursor-default' : ''
                }`}
                href={link.path}
              >
                {link.title}
              </Link>
            ))}
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
