'use client';

import { AiFillBug } from 'react-icons/ai';
import Link from 'next/link';
import React from 'react';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        { label: 'Dashboard', href: '/' },
        { label: 'Issues', href: '/issues' },
    ];
    return (
        <nav className='flex space-x-6 border-b px-5 h-14 items-center'>
            <Link href='/'>
                <AiFillBug />
            </Link>
            <ul className='flex space-x-6'>
                {links.map((link, key) => (
                    <Link
                        key={key}
                        href={link.href}
                        className={classnames({
                            'text-zinc-900': link.href === currentPath,
                            'text-zinc-500': link.href !== currentPath,
                            'hover:text-zinc-800 transition-colors': true,
                        })}
                    >
                        {link.label}
                    </Link>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
