import * as React from "react";
import axios from "axios";
import { serverURL } from "../../Helpers/Constants";
import type { UrlData } from "../../interface/urldata";
import { Copy, Trash2 } from "lucide-react";

interface IBodyProps {}

const Body: React.FunctionComponent<IBodyProps> = () => {
  const [fullUrl, setFullUrl] = React.useState<string>("");
  const [data, setData] = React.useState<UrlData[]>([]);

  // 🔹 Submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullUrl.trim()) return;

    try {
      await axios.post(`${serverURL}/shorturl`, { fullUrl });
      setFullUrl("");
      fetchTableData(); // refresh table
    } catch (error) {
      console.error("Error creating short URL:", error);
    }
  };

  // 🔹 Fetch all data
  const fetchTableData = async () => {
    try {
      const response = await axios.get(`${serverURL}/shorturl`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  // 🔹 Delete handler
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

  // 🔹 Table rows
  const renderTableData = () => {
    return data.map((item, index) => (
      <tr key={item._id || index} className="border-b">
        {/* Full URL */}
        <td className="px-6 py-3 text-left break-words max-w-[40vh]">
          <a
            href={item.fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {item.fullUrl}
          </a>
        </td>

        {/* Short URL */}
        <td className="px-6 py-3 text-left">
          <a
            href={`${serverURL}/shorturl/${item.shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            {item.shortUrl}
          </a>
        </td>

        {/* Clicks */}
        <td className="px-6 py-3 text-left">{item.clicks}</td>

        {/* Actions */}
        <td className="px-6 py-3 text-left flex gap-2">
          {/* Copy Button */}
          <button
            onClick={() =>
              navigator.clipboard.writeText(`${serverURL}/shorturl/${item.shortUrl}`)
            }
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1"
          >
            <Copy size={16} />
          </button>

          {/* Delete Button */}
          <button
            onClick={() => handleDelete(item._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
          >
            <Trash2 size={16} />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="bg-bg bg-cover min-h-[88vh] w-full flex flex-col">
      {/* Content Area */}
      <div className="flex flex-col flex-grow">
        <h1 className="text-white font-mono text-center font-bold text-[6vh] pt-[8vh]">
          Your Scrambled Links, Simplified
        </h1>

        <h2 className="text-white font-mono text-center font-bold p-[2vh] text-[4vh]">
          Paste Your Untidy links to Shortify
        </h2>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center pt-[3vh]">
          <div className="flex">
            <div className="bg-gray-100 p-[2vh] text-[2vh] font-bold text-bluet shadow-[0_0_20px_5px_rgba(96,165,250,0.7)]">
              URL
            </div>
            <input
              type="text"
              className="w-[90vh] h-[7vh] text-center font-bold shadow-[0_0_20px_5px_rgba(96,165,250,0.7)] rounded-r-lg"
              placeholder="PASTE YOUR LONG URL HERE to SHORTIFY"
              value={fullUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFullUrl(e.target.value)
              }
            />
          </div>

          <button
            type="submit"
            className="bg-white w-[17vh] h-[5vh]  font-extrabold shadow-[0_0_20px_2px_rgba(96,165,250,0.7)] text-bluet font-serif rounded-lg mt-[6vh] text-[2.5vh]"
          >
            Shortify
          </button>
        </form>

        {/* Table */}
        <div className="Container mx-auto pt-[10vh] pb-10 flex-grow">
          <div className="relative overflow-x-auto  sm:rounded-lg flex justify-center shadow-[0_0_30px_2px_rgba(96,165,250,0.7)]">
            <table className="w-[130vh] table-fixed text-sm text-bluet bg-slate-50 rounded-lg  ">
              <thead className="text-base uppercase text-[2vh] text-bluet">
                <tr>
                  <th scope="col" className="px-6 py-3 w-6/12 text-left">
                    Full Url
                  </th>
                  <th scope="col" className="px-6 py-3 w-3/12 text-left">
                    Shorturl
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Clicks
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>{renderTableData()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
