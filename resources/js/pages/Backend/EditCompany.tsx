import Sidebar from '../components/Backend/Sidebar';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function EditCompany({ company, errors = {} }: any) {
    const [form, setForm] = useState({
        name: company.name || '',
        address: company.address || '',
        industry: company.industry || '',
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(`/companies/${company.id}`, form);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Company</h1>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded shadow space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleInput}
                            className={`border rounded px-3 py-2 w-full ${errors.name ? 'border-red-500' : ''}`}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={form.address}
                            onChange={handleInput}
                            className={`border rounded px-3 py-2 w-full ${errors.address ? 'border-red-500' : ''}`}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Industry</label>
                        <input
                            type="text"
                            name="industry"
                            value={form.industry}
                            onChange={handleInput}
                            className={`border rounded px-3 py-2 w-full ${errors.industry ? 'border-red-500' : ''}`}
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
