import * as React from "react";
import axios from "axios";
import { serverURL } from "../../Helpers/Constants";
import type { UrlData } from "../../interface/urldata";
import { Copy, Trash2, Search, Filter, ExternalLink } from "lucide-react";

interface IBodyProps {}

const Body: React.FunctionComponent<IBodyProps> = () => {
  const [fullUrl, setFullUrl] = React.useState<string>("");
  const [data, setData] = React.useState<UrlData[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullUrl.trim()) return;
    try {
      await axios.post(`${serverURL}/shorturl`, { fullUrl });
      setFullUrl("");
      fetchTableData();
    } catch (error) {
      console.error("Error creating short URL:", error);
    }
  };

  const fetchTableData = async () => {
    try {
      const response = await axios.get(`${serverURL}/shorturl`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${serverURL}/shorturl/${id}`);
      fetchTableData();
    } catch (error) {
      console.error("Error deleting URL:", error);
    }
  };

  React.useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <div className="min-h-screen bg-[#060b1a] text-white px-4 py-12 md:px-20">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
        <div className="inline-block px-4 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-medium text-slate-300 uppercase tracking-wider">
          • New: Advanced Analytics 2.0
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Your Scrambled <br />
          <span className="text-slate-100">Links, Simplified.</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Paste your untidy links below to create trackable, manageable short links that look professional and boost engagement.
        </p>

        {/* Shorten Input Form */}
        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mt-10">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <ExternalLink className="text-slate-500 h-5 w-5" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-32 py-5 bg-[#10192d] border border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-200"
              placeholder="Paste your long link here..."
              value={fullUrl}
              onChange={(e) => setFullUrl(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-8 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl transition-all flex items-center gap-2"
            >
              Shortify <span className="text-lg">→</span>
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Stats Cards */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-[#0d1425] border border-slate-800 p-8 rounded-[2rem] space-y-4">
            <h3 className="text-xl font-semibold">Enterprise Grade Security</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every link is encrypted and monitored for malicious activity, ensuring your audience remains safe.
            </p>
            <div className="flex gap-3 pt-2">
              <span className="bg-slate-800/50 px-3 py-1 rounded text-xs text-slate-300">HTTPS Ready</span>
              <span className="bg-slate-800/50 px-3 py-1 rounded text-xs text-slate-300">2FA Auth</span>
            </div>
          </div>

          <div className="bg-[#0d1425] border border-slate-800 p-8 rounded-[2rem] text-center">
            <h2 className="text-5xl font-bold mb-1">12M+</h2>
            <p className="text-slate-500 text-xs uppercase tracking-[0.2em] mb-6">Links Shortened</p>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-slate-400 h-full w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Right Table Section */}
        <div className="md:col-span-2 bg-[#0d1425] border border-slate-800 rounded-[2rem] overflow-hidden">
          <div className="p-8 border-b border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold">Recent Links</h3>
              <p className="text-slate-500 text-xs mt-1">Manage your last created assets</p>
            </div>
            <div className="flex gap-2">
               <div className="relative">
                 <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                 <input className="bg-slate-800/40 border border-slate-700 rounded-lg pl-8 pr-4 py-2 text-xs focus:outline-none" placeholder="Search links..." />
               </div>
               <button className="bg-slate-800/40 border border-slate-700 p-2 rounded-lg text-slate-400">
                 <Filter size={14} />
               </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/30 text-[10px] uppercase text-slate-500 tracking-widest border-b border-slate-800">
                <tr>
                  <th className="px-8 py-4 font-medium">Original URL</th>
                  <th className="px-8 py-4 font-medium">Clicks</th>
                  <th className="px-8 py-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {data.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-8 py-5">
                      <div className="max-w-[250px] truncate text-slate-200 text-sm font-medium">{item.fullUrl}</div>
                      <div className="text-[10px] text-slate-500 mt-1 uppercase">Added 2 hours ago</div>
                    </td>
                    <td className="px-8 py-5 text-slate-300 text-sm">{item.clicks}</td>
                    <td className="px-8 py-5">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => navigator.clipboard.writeText(`${serverURL}/shorturl/${item.shortUrl}`)}
                          className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-500 hover:text-white transition-all text-slate-400"
                        >
                          <Copy size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item._id)}
                          className="p-2 bg-slate-800 rounded-lg hover:bg-red-500 hover:text-white transition-all text-slate-400"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 text-center border-t border-slate-800">
            <button className="text-xs text-slate-400 hover:text-white font-medium">View All Links</button>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div className="max-w-6xl mx-auto mt-12 rounded-[2rem] bg-gradient-to-r from-slate-900 to-indigo-950 p-12 relative overflow-hidden border border-slate-800">
         <div className="relative z-10 max-w-md">
            <h2 className="text-3xl font-bold mb-4">Go Beyond Simple Links.</h2>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Unlock detailed geographic data, device analytics, and custom domain branding to elevate your digital presence.
            </p>
            <button className="bg-indigo-400 hover:bg-indigo-300 text-indigo-950 font-bold px-8 py-3 rounded-xl transition-all">
              Start for Free
            </button>
         </div>
         {/* Decorative Background Element */}
         <div className="absolute right-0 top-0 w-1/2 h-full opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 to-transparent"></div>
      </div>
    </div>
  );
};

export default Body;