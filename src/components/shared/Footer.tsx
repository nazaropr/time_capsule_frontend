export default function Footer() {
  return (
    <footer className="mt-auto py-8 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-slate-400">
            © {new Date().getFullYear()} Time Capsule. Built with love for the future.
          </div>
          <div className="flex space-x-6 text-sm text-slate-500">
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-indigo-400 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
