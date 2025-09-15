import Sidebar from '../components/Backend/Sidebar';
import { useRef, useState } from 'react';
import { router } from '@inertiajs/react';

export default function CreateProject({ companyId, company }: any) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [cost, setCost] = useState('');
    const [includeTax, setIncludeTax] = useState(false);

    // Calculate total with 18% tax if checked
    const getTotal = () => {
        const base = parseFloat(cost) || 0;
        if (includeTax) {
            return (base * 1.18).toFixed(2);
        }
        return base.toFixed(2);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set('project_cost', cost);
        formData.set('include_tax', includeTax ? '1' : '0');
        formData.set('total', getTotal());
        router.post(`/companies/${companyId}/projects`, formData);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-8">
                {/* Back Button */}
                <div className='flex flex-wrap justify-between'>
                    
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Project</h1>
  <div className="mb-6">
                    <button
                        type="button"
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                        onClick={() => router.visit(`/companies/${companyId}`)}
                    >
                        &larr; Back
                    </button>
                </div>
                </div>
                <form
                    className="max-w-5xl mx-auto bg-white p-8 rounded shadow space-y-6"
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                >
                    {/* Company and Client Info */}
                    <div className="flex flex-wrap gap-6 mb-4">
                        <div className="flex-1 min-w-[220px]">
                            <label className="block text-sm font-medium">Company Name</label>
                            <input
                                type="text"
                                name="company_name"
                                className="border rounded px-3 py-2 w-full"
                                placeholder="Company Name"
                                defaultValue={company?.name || ''}
                                readOnly
                            />
                        </div>
                        <div className="flex-1 min-w-[220px]">
                            <label className="block text-sm font-medium">Company Address</label>
                            <input
                                type="text"
                                name="company_address"
                                className="border rounded px-3 py-2 w-full"
                                placeholder="Company Address"
                                defaultValue={company?.address || ''}
                                readOnly
                            />
                        </div>
                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-sm font-medium">Company Industry</label>
                            <input
                                type="text"
                                name="company_industry"
                                className="border rounded px-3 py-2 w-full"
                                placeholder="Industry"
                                defaultValue={company?.industry || ''}
                                readOnly
                            />
                        </div>
                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-sm font-medium">Company Phone</label>
                            <input
                                type="text"
                                name="company_phone"
                                className="border rounded px-3 py-2 w-full"
                                placeholder="Company Phone"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6 mb-4">
                        <div className="flex-1 min-w-[220px]">
                            <label className="block text-sm font-medium">Client Name</label>
                            <input
                                type="text"
                                name="client_name"
                                className="border rounded px-3 py-2 w-full"
                                placeholder="Client Name"
                            />
                        </div>
                        <div className="flex-1 min-w-[220px]">
                            <label className="block text-sm font-medium">Client Email</label>
                            <input
                                type="email"
                                name="client_email"
                                className="border rounded px-3 py-2 w-full"
                                placeholder="client@email.com"
                            />
                        </div>
                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-sm font-medium">Client Phone</label>
                            <input
                                type="text"
                                name="client_phone"
                                className="border rounded px-3 py-2 w-full"
                                placeholder="Client Phone"
                            />
                        </div>
                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-sm font-medium">Client Address</label>
                            <input
                                type="text"
                                name="client_address"
                                className="border rounded px-3 py-2 w-full"
                                placeholder="Client Address"
                            />
                        </div>
                    </div>
                    {/* Product & Project Info */}
                    <div className="flex flex-wrap gap-6 mb-4">
                        <div className="flex-1 min-w-[220px]">
                            <label className="block text-sm font-medium">Product Name</label>
                            <input
                                type="text"
                                name="product_name"
                                className="border rounded px-3 py-2 w-full"
                                placeholder="Product Name"
                            />
                        </div>
                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-sm font-medium">Product Model</label>
                            <input
                                type="text"
                                name="product_model"
                                className="border rounded px-3 py-2 w-full"
                                placeholder="Model #"
                            />
                        </div>
                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-sm font-medium">Delivery Date</label>
                            <input
                                type="date"
                                name="delivery_date"
                                className="border rounded px-3 py-2 w-full"
                            />
                        </div>
                    </div>
                    {/* Project Details */}
                    <div className="flex flex-wrap gap-6 mb-4">
                        <div className="flex-1 min-w-[220px]">
                            <label className="block text-sm font-medium">Project Title</label>
                            <input
                                type="text"
                                name="project_title"
                                className="border rounded px-3 py-2 w-full"
                                placeholder="Project Title"
                            />
                        </div>
                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-sm font-medium">Start Date</label>
                            <input
                                type="date"
                                name="start_date"
                                className="border rounded px-3 py-2 w-full"
                            />
                        </div>
                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-sm font-medium">Draft Date</label>
                            <select
                                name="draft_date"
                                className="border rounded px-3 py-2 w-full"
                            >
                                <option value="">Select Draft Date</option>
                                <option value="today">Today</option>
                                <option value="tomorrow">Tomorrow</option>
                                <option value="next_week">Next Week</option>
                                <option value="custom">Custom</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Project Description</label>
                        <textarea
                            name="project_description"
                            className="border rounded px-3 py-2 w-full"
                            placeholder="Describe the project"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Related Documents</label>
                        <input
                            type="file"
                            name="documents"
                            ref={fileInputRef}
                            className="border rounded px-3 py-2 w-full"
                            multiple
                        />
                    </div>
                    <div className="flex flex-wrap gap-6 mb-4">
                        <div className="flex-1 min-w-[180px]">
                            <label className="block text-sm font-medium">Project Cost</label>
                            <input
                                type="number"
                                name="project_cost"
                                className="border rounded px-3 py-2 w-full"
                                placeholder="0.00"
                                value={cost}
                                onChange={e => setCost(e.target.value)}
                            />
                        </div>
                        <div className="flex-1 min-w-[180px] flex items-end">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={includeTax}
                                    onChange={e => setIncludeTax(e.target.checked)}
                                    className="mr-2"
                                />
                                <span>Add 18% Tax</span>
                            </label>
                        </div>
                        <div className="flex-1 min-w-[180px] flex items-end">
                            <span className="text-green-700 font-semibold">
                                Total: ₹ {getTotal()}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Create Project
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}
