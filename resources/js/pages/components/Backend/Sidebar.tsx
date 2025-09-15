import React from 'react';
import { Link } from '@inertiajs/react';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white shadow-lg min-h-screen flex flex-col">
            <div className="p-6 border-b">
                <span className="text-xl font-bold text-blue-600">MyApp</span>
            </div>
            <nav className="flex-1 p-4">
                <ul className="space-y-2">
               
                    <li>
                        <Link href="/companies" className="block px-4 py-2 rounded hover:bg-blue-50 text-gray-700 font-medium">
                            Companies
                        </Link>
                    </li>
                
                </ul>
            </nav>
            <div className="p-4 border-t">
                <Link href="/logout" method="post" as="button" className="w-full text-left px-4 py-2 rounded bg-red-50 text-red-600 hover:bg-red-100 font-medium">
                    Logout
                </Link>
            </div>
        </aside>
    );
}
