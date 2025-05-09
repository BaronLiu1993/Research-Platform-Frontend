import Link from "next/link";

export default function navbar() {
  return (
    <>
      <header className="bg-gray-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo or left section */}
            <div className="flex-shrink-0">
              {/* Add your logo or brand here if needed */}
            </div>

            {/* Right-aligned Navbar */}
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="font-sans inline-flex items-center px-4 py-2 border text-black text-sm font-medium rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="font-sans inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
