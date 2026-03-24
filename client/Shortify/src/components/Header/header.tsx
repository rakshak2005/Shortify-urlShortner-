import * as React from "react";
import { Link2 } from "lucide-react";

const Header: React.FC = () => {
  return (
    // 1. bg-[#060b1a] matches your body exactly
    // 2. border-white/5 adds that subtle "separator" line without using gray
    // 3. Removed all shadow classes (no shadow-md or shadow-lg)
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#060b1a] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="p-1">
            <Link2 className="text-white group-hover:text-indigo-400 transition-colors" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Shortify
          </span>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-8">
          <a 
            href="#login" 
            className="text-sm font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Login
          </a>
          
          {/* Using the specific dusty purple #5a4f6f from your reference UI */}
          <button className="bg-[#5a4f6f] hover:bg-[#6a5f7f] text-white px-8 py-2.5 rounded-xl text-sm font-bold transition-all border border-white/10">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;