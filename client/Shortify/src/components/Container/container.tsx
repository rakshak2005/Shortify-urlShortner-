import * as React from "react";
import axios from "axios";
import { serverURL } from "../../Helpers/Constants";
import type { UrlData } from "../../interface/urldata";
import { Copy, Trash2 , ExternalLink } from "lucide-react";

const Body: React.FunctionComponent = () => {
  const [fullUrl, setFullUrl] = React.useState<string>("");
  const [customUrl, setCustomUrl] = React.useState<string>(""); // ✅ NEW
  const [data, setData] = React.useState<UrlData[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullUrl.trim()) return;

    try {
      await axios.post(`${serverURL}/shorturl`, {
        fullUrl,
        customUrl: customUrl.trim() ? customUrl : undefined
      });

      setFullUrl("");
      setCustomUrl(""); // reset
      fetchTableData();
    } catch (error) {
      console.error("Error creating short URL:", error);
      alert("Custom URL might already be taken");
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
      
      <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Your Scrambled <br />
          <span className="text-slate-100">Links, Simplified.</span>
        </h1>

        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Paste your untidy links below to create trackable links.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto mt-10 space-y-3">
          
          {/* ORIGINAL INPUT (UNCHANGED) */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <ExternalLink className="text-slate-500 h-5 w-5" />
            </div>

            <input
              type="text"
              className="block w-full pl-12 pr-32 py-5 bg-[#10192d] border border-slate-800 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-200"
              placeholder="Paste your long link here..."
              value={fullUrl}
              onChange={(e) => setFullUrl(e.target.value)}
            />

            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-8 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl"
            >
              Shortify →
            </button>
          </div>

          {/* ✅ NEW CUSTOM URL INPUT (MINIMAL ADDITION) */}
          <input
            type="text"
            className="w-full px-4 py-3 bg-[#10192d] border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-200"
            placeholder="Custom short link (optional) e.g. raka"
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
          />

        </form>
      </div>

      {/* REST OF YOUR UI UNCHANGED */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
       
        <div className="md:col-span-1 space-y-6">
          <div className="bg-[#0d1425] border border-slate-800 p-8 rounded-[2rem] space-y-4">
            <h3 className="text-xl font-semibold">Enterprise Grade Security</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every link is encrypted and monitored.
            </p>
          </div>
        </div>

        <div className="md:col-span-2 bg-[#0d1425] border border-slate-800 rounded-[2rem] overflow-hidden">

          <div className="p-8 border-b border-slate-800">
            <h3 className="text-xl font-semibold">Recent Links</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900/30 text-[10px] uppercase text-slate-500 border-b border-slate-800">
                <tr>
                  <th className="px-8 py-4">Original URL</th>
                  <th className="px-8 py-4">Clicks</th>
                  <th className="px-8 py-4">Action</th>
                </tr>
              </thead>

             <tbody className="divide-y divide-slate-800/50">
  {data.map((item) => (
    <tr key={item._id}>
      
      {/* ORIGINAL URL */}
      <td className="px-8 py-5 truncate max-w-[200px] text-slate-400">
        {item.fullUrl}
      </td>

      {/* SHORT LINK */}
      <td className="px-8 py-5 text-indigo-400 font-medium">
        <a
          href={`${serverURL}/${item.shortUrl}`}
          target="_blank"
          rel="noreferrer"
        >
          /{item.shortUrl}
        </a>
      </td>

      {/* CLICKS */}
      <td className="px-8 py-5">{item.clicks}</td>

      {/* ✅ ACTION BUTTONS */}
      <td className="px-8 py-5 flex gap-3">

        {/* COPY BUTTON */}
        <button
          onClick={() => {
            const link = `${serverURL}/${item.shortUrl}`;
            navigator.clipboard.writeText(link);
            alert("Copied: " + link);
          }}
          className="p-2 bg-slate-800 rounded-lg hover:bg-indigo-500"
        >
          <Copy size={16} />
        </button>

        {/* DELETE BUTTON */}
        <button
          onClick={() => handleDelete(item._id)}
          className="p-2 bg-slate-800 rounded-lg hover:bg-red-500"
        >
          <Trash2 size={16} />
        </button>

      </td>

    </tr>
  ))}
</tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Body;