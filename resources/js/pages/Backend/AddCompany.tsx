import Sidebar from '../components/Backend/Sidebar';
import { router } from '@inertiajs/react';

export default function AddCompany(props: any) {
    const formErrors = props.errors;
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        router.post('/add_company', formData);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Add Company</h1>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded shadow space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            className={`border rounded px-3 py-2 w-full ${formErrors.name ? 'border-red-500' : ''}`}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Address</label>
                        <input
                            type="text"
                            name="address"
                            className={`border rounded px-3 py-2 w-full ${formErrors.address ? 'border-red-500' : ''}`}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Industry</label>
                        <input
                            type="text"
                            name="industry"
                            className={`border rounded px-3 py-2 w-full ${formErrors.industry ? 'border-red-500' : ''}`}
                            required
                        />
                    </div>
                     {/* toggle create active and in active company */}
                     <div className="flex items-center mb-4">
                         <input
                             type="checkbox"
                             id="isActive"
                             name="isActive"
                             className="mr-2"
                         />
                         <label htmlFor="isActive" className="text-sm font-medium">
                             Active
                         </label>
                     </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}