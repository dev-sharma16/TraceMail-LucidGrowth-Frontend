import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../axios/axios.config";
import { ArrowLeft, Globe, Server, FileText } from "lucide-react";

export default function EmailDetail() {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const res = await axios.get(`/emails/${id}`);
        setEmail(res.data);
        // console.log(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmail();
  }, [id]);

  if (loading) return <p className="p-4 text-center">Loading email details...</p>;
  if (!email) return <p className="p-4 text-center text-red-600">Email not found</p>;

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <Link to="/dashboard" className="flex items-center text-blue-600 hover:underline mb-4">
        <ArrowLeft size={18} className="mr-1" /> Back to Dashboard
      </Link>

      {/* Subject */}
      <h2 className="text-2xl font-bold mb-2">{email.subject}</h2>

      {/* From / To */}
      <p className="text-sm text-gray-600 mb-4">
        <span className="font-medium">From:</span> {email.from} <br />
        <span className="font-medium">To:</span> {email.to?.join(", ")}
      </p>

      {/* ESP Info */}
      <div className="bg-blue-50 p-3 rounded mb-4">
        <h3 className="font-medium mb-1 flex items-center gap-1">
          <Globe size={16} /> ESP Details
        </h3>
        <p><strong>Provider:</strong> {email.esp?.provider || "Unknown"}</p>
        <p><strong>Confidence:</strong> {email.esp?.confidence}</p>
        {email.esp?.reasons?.length > 0 && (
          <ul className="list-disc list-inside text-sm mt-1">
            {email.esp.reasons.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        )}
      </div>

      {/* Receiving Chain */}
      <div className="bg-gray-50 p-3 rounded mb-4">
        <h3 className="font-medium mb-2 flex items-center gap-1">
          <Server size={16} /> Receiving Chain
        </h3>
        {email.receivingChain?.length > 0 ? (
          <ul className="text-xs space-y-1">
            {email.receivingChain.map((hop, i) => (
              <li key={i}>
                {i + 1}. {hop.by} ← {hop.from} ({hop.ip})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No chain data available.</p>
        )}
      </div>

      {/* Raw Headers */}
      <div className="bg-white p-3 rounded shadow mt-4">
        <h3 className="font-medium mb-2 flex items-center gap-1">
          <FileText size={16} /> Raw Headers
        </h3>
        {email.rawHeaders ? (
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto whitespace-pre-wrap">
            {Object.entries(email.rawHeaders)
              .map(([key, value]) => `${key}: ${value}`)
              .join("\n")}
          </pre>
        ) : (
          <p className="text-sm text-gray-500">No headers available</p>
        )}
      </div>
    </div>
  );
}
