import * as React from "react";
import { Link2 } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#060b1a] border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <Link2 className="text-indigo-400" size={18} />
            <span className="text-lg font-bold text-white">Shortify</span>
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-widest text-slate-500">
          <p>Copyright © 2026 Shortify | Rakshak All rights reserved.</p>
          <div className="flex gap-4">
            <span>Built with React</span>
            <span>•</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;