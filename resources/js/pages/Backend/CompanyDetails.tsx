import Sidebar from '../components/Backend/Sidebar';
import { router } from '@inertiajs/react';

export default function CompanyDetails({ company, projects = [] }: any) {
    return (
        <div className="flex bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Company Details</h1>
                <div className="bg-white p-6 rounded shadow max-w-7xl mx-auto">
                    <div className="flex flex-wrap items-center gap-4 text-lg mb-2">
                        <span><strong>Name:</strong> {company.name}</span>
                        <span><strong>Address:</strong> {company.address}</span>
                        <span><strong>Industry:</strong> {company.industry}</span>
                        <span>
                            <strong>Status:</strong>{' '}
                            {company.active
                                ? <span className="text-green-700 font-semibold">Active</span>
                                : <span className="text-gray-500 font-semibold">Inactive</span>
                            }
                        </span>
                    </div>
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded text-blue-800">
                        <strong>Note:</strong> All subsequent data and actions (future modules, e.g., invoices, projects) will be <span className="font-bold">{company.active ? 'scoped to this active company.' : 'scoped to your current active company.'}</span>
                    </div>
                    {/* Only show Create Project button */}
                    <div className="flex gap-4 mt-8 justify-end">
                        <button
                            className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
                            onClick={() => router.visit(`/companies/${company.id}/projects/create`)}
                        >
                            Create Project
                        </button>
                    </div>
                    {/* Project Basic Details Table */}
                    <div className="mt-10">
                        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
                        {projects.length === 0 ? (
                            <div className="text-gray-500">No projects found for this company.</div>
                        ) : (
                            <div className="overflow-x-auto text-[13px]">
                                <table className="min-w-full bg-white border rounded">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border-b">Title</th>
                                            <th className="px-4 py-2 border-b">Client</th>
                                            <th className="px-4 py-2 border-b">Product</th>
                                            <th className="px-4 py-2 border-b">Cost</th>
                                            <th className="px-4 py-2 border-b">Status</th>
                                            <th className="px-4 py-2 border-b">Start Date</th>
                                            <th className="px-4 py-2 border-b">Delivery Date</th>
                                            <th className="px-4 py-2 border-b">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.map((project: any) => (
                                            <tr key={project.id} className="border-t">
                                                <td className="px-4 py-2">{project.project_title}</td>
                                                <td className="px-4 py-2">{project.client_name}</td>
                                                <td className="px-4 py-2">{project.product_name}</td>
                                                <td className="px-4 py-2">₹ {project.project_cost}</td>
                                                <td className="px-4 py-2">{project.status || '-'}</td>
                                                <td className="px-4 py-2">{project.start_date || '-'}</td>
                                                <td className="px-4 py-2">{project.delivery_date || '-'}</td>
                                                <td className="px-4 py-2 flex gap-2">
                                                    <button
                                                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs"
                                                        onClick={() => router.visit(`/projects/${project.id}/invoices/create`)}
                                                    >
                                                        Create Invoice
                                                    </button>
                                                    <button
                                                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-xs"
                                                        onClick={() => router.visit(`/projects/${project.id}/edit`)}
                                                    >
                                                        Update Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
