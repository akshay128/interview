import React from 'react';
import Sidebar from '../components/Backend/Sidebar';
export default function Profile() {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Profile</h1>
                {/* ...profile content here... */}
                <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-600">User profile information will be displayed here.</p>
                </div>
            </main>
        </div>
    );
}