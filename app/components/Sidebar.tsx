import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r h-screen fixed left-0 top-0 overflow-y-auto shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-blue-600">Insurance CRM</h2>
      </div>
      <nav className="p-4 space-y-2">
        <Link href="/" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">
          Dashboard
        </Link>
        <Link href="/pipeline" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">
          Pipeline
        </Link>
        <Link href="/analytics" className="block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">
          Analytics
        </Link>
      </nav>
    </aside>
  );
}
