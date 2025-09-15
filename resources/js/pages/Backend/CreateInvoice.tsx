import Sidebar from '../components/Backend/Sidebar';
import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function CreateInvoice({ company, project, projectInvoices = [] }: any) {
    const [mode, setMode] = useState<'add' | 'view'>('add');
    const [filter, setFilter] = useState('');
    const [form, setForm] = useState({
        invoice_number: '',
        invoice_date: '',
        paid_amount: '',
        due_date: '',
        gst_included: false,
        notes: '',
        payment_status: 'draft',
    });

    // Calculate total paid so far
    const totalPaid = projectInvoices.reduce((sum: number, inv: any) => sum + (parseFloat(inv.paid_amount) || 0), 0);
    const remaining = (parseFloat(project?.project_cost) || 0) - totalPaid;

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type, value, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.post(`/projects/${project.id}/invoices`, form, {
            onSuccess: () => {
                setForm({
                    invoice_number: '',
                    invoice_date: '',
                    paid_amount: '',
                    due_date: '',
                    gst_included: false,
                    notes: '',
                    payment_status: 'draft',
                });
                setMode('view');
            }
        });
    };

    // Filter invoices by invoice number or status
    const filteredInvoices = projectInvoices.filter((inv: any) =>
        inv.invoice_number?.toLowerCase().includes(filter.toLowerCase()) ||
        inv.payment_status?.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-0 md:p-8 flex flex-col items-center relative">
                <div className="w-full max-w-5xl mt-8">
                    {/* Toggle Buttons */}
                    <div className="flex gap-4 mb-8">
                        <button
                            className={`px-5 py-2 rounded font-bold ${mode === 'add' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setMode('add')}
                        >
                            Add Invoice
                        </button>
                        <button
                            className={`px-5 py-2 rounded font-bold ${mode === 'view' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => setMode('view')}
                        >
                            View Invoices
                        </button>
                    </div>

                    {/* Company & Project Details only in Add Invoice mode */}
                    {mode === 'add' && (
                        <>
                            <div className="bg-white rounded-xl shadow p-6 mb-6 border border-blue-100">
                                <h2 className="text-lg font-bold mb-2 text-blue-900">Company Details</h2>
                                <div className="flex flex-wrap gap-x-8 gap-y-2 text-base">
                                    <span><strong>Name:</strong> {company?.name || '-'}</span>
                                    <span><strong>Address:</strong> {company?.address || '-'}</span>
                                    <span><strong>Industry:</strong> {company?.industry || '-'}</span>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow p-6 mb-6 border border-blue-100">
                                <h2 className="text-lg font-bold mb-2 text-blue-900">Project Details</h2>
                                <table className="min-w-full text-base">
                                    <tbody>
                                        <tr>
                                            <td className="py-1 pr-4 font-semibold text-gray-700">Title:</td>
                                            <td className="py-1">{project?.project_title || '-'}</td>
                                            <td className="py-1 pr-4 font-semibold text-gray-700">Client:</td>
                                            <td className="py-1">{project?.client_name || '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 pr-4 font-semibold text-gray-700">Email:</td>
                                            <td className="py-1">{project?.client_email || '-'}</td>
                                            <td className="py-1 pr-4 font-semibold text-gray-700">Phone:</td>
                                            <td className="py-1">{project?.client_phone || '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 pr-4 font-semibold text-gray-700">Address:</td>
                                            <td className="py-1">{project?.client_address || '-'}</td>
                                            <td className="py-1 pr-4 font-semibold text-gray-700">Product:</td>
                                            <td className="py-1">{project?.product_name || '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 pr-4 font-semibold text-gray-700">Model:</td>
                                            <td className="py-1">{project?.product_model || '-'}</td>
                                            <td className="py-1 pr-4 font-semibold text-gray-700">Delivery Date:</td>
                                            <td className="py-1">{project?.delivery_date || '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 pr-4 font-semibold text-gray-700">Start Date:</td>
                                            <td className="py-1">{project?.start_date || '-'}</td>
                                            <td className="py-1 pr-4 font-semibold text-gray-700">Draft Date:</td>
                                            <td className="py-1">{project?.draft_date || '-'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 pr-4 font-semibold text-gray-700">Cost:</td>
                                            <td className="py-1">₹ {project?.project_cost || '-'}</td>
                                            <td className="py-1 pr-4 font-semibold text-gray-700">Include Tax:</td>
                                            <td className="py-1">{project?.include_tax ? 'Yes' : 'No'}</td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 pr-4 font-semibold text-gray-700">Total:</td>
                                            <td className="py-1">₹ {project?.total || '-'}</td>
                                            <td className="py-1 pr-4 font-semibold text-gray-700">Documents:</td>
                                            <td className="py-1">
                                                {project?.documents
                                                    ? (
                                                        <div>
                                                            {(() => {
                                                                const url = project.documents.startsWith('http')
                                                                    ? project.documents
                                                                    : `/storage/${project.documents}`;
                                                                const ext = project.documents.split('.').pop().toLowerCase();
                                                                if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(ext)) {
                                                                    return (
                                                                        <img
                                                                            src={url}
                                                                            alt="Project Document"
                                                                            className="max-h-24 max-w-xs rounded border"
                                                                        />
                                                                    );
                                                                } else if (ext === 'pdf') {
                                                                    return (
                                                                        <a
                                                                            href={url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-blue-700 underline"
                                                                        >
                                                                            View PDF
                                                                        </a>
                                                                    );
                                                                } else {
                                                                    return (
                                                                        <a
                                                                            href={url}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-blue-700 underline"
                                                                        >
                                                                            Download File
                                                                        </a>
                                                                    );
                                                                }
                                                            })()}
                                                        </div>
                                                    )
                                                    : '-'
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="mt-2"><span className="font-semibold text-gray-700">Description:</span> {project?.project_description || '-'}</div>
                            </div>
                        </>
                    )}

                    {/* Add Invoice Form */}
                    {mode === 'add' && (
                        <form className="bg-white rounded-xl shadow p-8 space-y-6 border border-blue-100" onSubmit={handleSubmit}>
                            <h2 className="text-lg font-bold mb-4 text-blue-900">Add Invoice</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Invoice Number</label>
                                    <input
                                        type="text"
                                        name="invoice_number"
                                        value={form.invoice_number}
                                        onChange={handleInput}
                                        className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-200"
                                        placeholder="INV-0001"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Invoice Date</label>
                                    <input
                                        type="date"
                                        name="invoice_date"
                                        value={form.invoice_date}
                                        onChange={handleInput}
                                        className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Paid Amount</label>
                                    <input
                                        type="number"
                                        name="paid_amount"
                                        value={form.paid_amount}
                                        onChange={handleInput}
                                        className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-200"
                                        placeholder="0.00"
                                        min={0}
                                        max={remaining}
                                    />
                                    <div className="text-xs text-gray-500 mt-1">
                                        Remaining: ₹ {remaining} &nbsp;|&nbsp; Paid: ₹ {totalPaid}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Due Date</label>
                                    <input
                                        type="date"
                                        name="due_date"
                                        value={form.due_date}
                                        onChange={handleInput}
                                        className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">GST Included</label>
                                    <input
                                        type="checkbox"
                                        name="gst_included"
                                        checked={form.gst_included}
                                        onChange={handleInput}
                                        className="mr-2"
                                    />
                                    <span className="text-sm">Add GST (18%)</span>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Payment Status</label>
                                    <select
                                        name="payment_status"
                                        value={form.payment_status}
                                        onChange={handleInput}
                                        className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-200"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="sent">Sent</option>
                                        <option value="paid">Paid</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Notes</label>
                                <textarea
                                    name="notes"
                                    value={form.notes}
                                    onChange={handleInput}
                                    className="border border-gray-300 rounded px-3 py-2 w-full focus:ring-2 focus:ring-blue-200"
                                    placeholder="Invoice notes"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                                >
                                    Create Invoice
                                </button>
                            </div>
                        </form>
                    )}

                    {/* View Invoices Table */}
                    {mode === 'view' && (
                        <div className="bg-white rounded-xl shadow p-8 border border-blue-100">
                            <div className="flex flex-wrap justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-blue-900">Invoices</h2>
                                <input
                                    type="text"
                                    placeholder="Filter by # or status..."
                                    className="border px-3 py-2 rounded w-64"
                                    value={filter}
                                    onChange={e => setFilter(e.target.value)}
                                />
                            </div>
                            {filteredInvoices.length === 0 ? (
                                <div className="text-gray-500">No invoices found.</div>
                            ) : (
                                <table className="min-w-full bg-white border rounded text-sm">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border-b">Invoice #</th>
                                            <th className="px-4 py-2 border-b">Date</th>
                                            <th className="px-4 py-2 border-b">Paid Amount</th>
                                            <th className="px-4 py-2 border-b">Due Date</th>
                                            <th className="px-4 py-2 border-b">GST</th>
                                            <th className="px-4 py-2 border-b">GST Amt</th>
                                            <th className="px-4 py-2 border-b">Total</th>
                                            <th className="px-4 py-2 border-b">Status</th>
                                            <th className="px-4 py-2 border-b">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredInvoices.map((inv: any) => (
                                            <tr key={inv.id} className="border-t">
                                                <td className="px-4 py-2">{inv.invoice_number}</td>
                                                <td className="px-4 py-2">{inv.invoice_date}</td>
                                                <td className="px-4 py-2">₹ {inv.paid_amount}</td>
                                                <td className="px-4 py-2">{inv.due_date}</td>
                                                <td className="px-4 py-2">{inv.gst_included ? 'Yes' : 'No'}</td>
                                                <td className="px-4 py-2">₹ {inv.gst_amount}</td>
                                                <td className="px-4 py-2">₹ {inv.total}</td>
                                                <td className={`px-4 py-2 font-semibold ${inv.payment_status === 'paid' ? 'text-green-700' : 'text-gray-700'}`}>{inv.payment_status}</td>
                                                <td className="px-4 py-2">{inv.notes || '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
