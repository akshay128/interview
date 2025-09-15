import Sidebar from '../components/Backend/Sidebar';
import { router } from '@inertiajs/react';

export default function Companies(props: any) {
    const companie = props.companies;

    // Set active company
    const setActive = (companyId: number) => {
        router.post(`/companies/${companyId}/set_active`);
    };

    // Delete company
    const deleteCompany = (companyId: number) => {
        if (confirm('Are you sure you want to delete this company?')) {
            router.delete(`/companies/${companyId}`);
        }
    };

    // View details
    const viewDetails = (companyId: number) => {
        router.visit(`/companies/${companyId}`);
    };

    // Edit company
    const editCompany = (companyId: number) => {
        router.visit(`/companies/${companyId}/edit`);
    };

    // Toggle active company (activate or deactivate)
    const toggleActive = (company: any) => {
        if (!company.active) {
            router.post(`/companies/${company.id}/set_active`);
        }
        // No "Unactive" button, only allow switching to another
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Companies</h1>
                <div className="flex justify-end mb-4">
                    <a
                        href='/add_company'
                        id="Add_new_company"
                        className="bg-blue-600 ring-2 ring-blue-400 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition font-bold"
                    >
                        Add Company
                    </a>
                </div>
                <div className='flex justify-between mb-4'>
                    <div className='flex items-center'>
                        <input type="text" placeholder="Search..." className="border rounded-l px-4 py-2" />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-r">
                            Search
                        </button>
                    </div>
                    <div>
                        <select className="border rounded px-4 py-2">
                            <option value="active">5</option>
                            <option value="inactive">10</option>
                            <option value="suspended">15</option>
                            <option value="deleted">20</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                </div>
                {/* Static company cards in document flow */}
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               
                {
                    companie.map((company: any) => (
                        <div key={company.id} className="bg-white rounded-lg shadow p-5 flex flex-col gap-3 mb-6">
                            <div className="flex items-center gap-4 relative">
                                <div className='position-relative'>
                                    {company.active ? (
                                        <div className='absolute -top-2 right-0 p-1 bg-green-900  rounded text-xs text-white'>Active</div>
                                    ) : null}
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-gray-800">{company.name}</div>
                                    <div className="">{company.address}</div>
                                    <div className="text-gray-500 text-sm">{company.email}</div>
                                    {company.industry}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2 text-[0.65rem]">
                                <button
                                    onClick={() => editCompany(company.id)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteCompany(company.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => viewDetails(company.id)}
                                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200 border border-blue-300 transition"
                                >
                                    View Details
                                </button>
                                {!company.active && (
                                    <button
                                        onClick={() => toggleActive(company)}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                                    >
                                        Set Active
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                }
                    {/* ...add more static cards as needed... */}
                </div>
                {/* Pagination UI */}
                <div className="flex justify-end mt-8">
                    <nav className="flex border rounded overflow-hidden">
                        <button className="px-3 py-2 text-gray-500 bg-white hover:bg-gray-50 border-r outline-none">
                            Previous
                        </button>
                        <button className="px-3 py-2 text-blue-600 bg-white hover:bg-gray-50 border-r outline-none">
                            1
                        </button>
                        <button className="px-3 py-2 text-white bg-blue-500 font-bold border-r outline-none">
                            2
                        </button>
                        <button className="px-3 py-2 text-blue-600 bg-white hover:bg-gray-50 border-r outline-none">
                            3
                        </button>
                        <button className="px-3 py-2 text-blue-600 bg-white hover:bg-gray-50 outline-none">
                            Next
                        </button>
                    </nav>
                </div>
            </main>
        </div>
    );
}