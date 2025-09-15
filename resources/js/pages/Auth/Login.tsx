import { router, usePage } from "@inertiajs/react";

export default function Login() {
    const { errors } = usePage().props as any;

    // Login handler
    const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        router.post("/login/check", formData);
    };

    // Register handler
    const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        router.post("/register/users", formData, {
            onError: (errors) => console.log(errors),
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100 py-8 px-4">
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">

                {/* Login Card */}
                <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-blue-600 mb-6">Login</h1>
                    <form onSubmit={handleLoginSubmit} className="w-full max-w-xs space-y-5">
                        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                        <div>
                            <label htmlFor="login-email" className="block text-gray-700 font-semibold mb-1">Email</label>
                            <input
                                type="email"
                                id="login-email"
                                name="email"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="login-password" className="block text-gray-700 font-semibold mb-1">Password</label>
                            <input
                                type="password"
                                id="login-password"
                                name="password"
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="••••••••"
                            />
                            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600 transition duration-200 shadow"
                        >
                            Login
                        </button>
                    </form>
                </div>

                {/* Register Card */}
                <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-green-600 mb-6">Register</h1>
                    <form onSubmit={handleRegisterSubmit} className="w-full max-w-xs space-y-5">
                        <div>
                            <label htmlFor="register-name" className="block text-gray-700 font-semibold mb-1">Name</label>
                            <input
                                type="text"
                                id="register-name"
                                name="name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="register-email" className="block text-gray-700 font-semibold mb-1">Email</label>
                            <input
                                type="email"
                                id="register-email"
                                name="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="register-password" className="block text-gray-700 font-semibold mb-1">Password</label>
                            <input
                                type="password"
                                id="register-password"
                                name="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label htmlFor="register-password_confirmation" className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
                            <input
                                type="password"
                                id="register-password_confirmation"
                                name="password_confirmation"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600 transition duration-200 shadow"
                        >
                            Register
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
