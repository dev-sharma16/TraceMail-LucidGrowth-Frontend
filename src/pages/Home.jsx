import { useState } from "react";
import { Copy, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios/axios.config.js"

export default function Home() {
  const testEmail = import.meta.env.VITE_TEST_EMAIL;
  const testToken = import.meta.env.VITE_TEST_SUBJECT_TOKEN; // add this in .env
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [rawHeader, setRawHeader] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCopy = (text, setCopied) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!rawHeader.trim()) return alert("Please paste email headers first");
    setLoading(true);
    try {
      const res = await axios.post(`/manual`, { rawHeader });
      if (res.data?._id) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Error processing header");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-6 text-center max-w-xl mx-auto mt-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        Welcome to TraceMail Analyzer
      </h1>
      <p className="mb-4 text-gray-700">
        To test the system, please send an email to:
      </p>

      {/* Copyable Email Box */}
      <div
        onClick={() => handleCopy(testEmail, setCopiedEmail)}
        className="relative bg-gray-100 rounded-lg p-3 mb-6 cursor-pointer group hover:bg-gray-200 transition"
      >
        <span className="font-mono text-blue-600">{testEmail}</span>
        {/* Tooltip */}
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
          {copiedEmail ? "Copied!" : "Tap to copy"}
        </span>

        {/* Copy Icon */}
        <Copy
          size={16}
          className="inline ml-5 text-gray-500 group-hover:text-gray-700"
        />
      </div>

      {/* Copyable Token Example */}
      <p className="text-md text-gray-900 mt-2 mb-7">
        Example:{" "}
        <span
          onClick={() => handleCopy(testToken, setCopiedToken)}
          className="relative font-mono text-blue-600 bg-gray-100 rounded-lg p-1 px-2 cursor-pointer group hover:bg-gray-200 transition"
        >
          {testToken}
          {/* Tooltip */}
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            {copiedToken ? "Copied!" : "Tap to copy"}
          </span>
          <Copy size={14} className="inline ml-2 text-gray-500 group-hover:text-gray-700" />
        </span>{" "}
        Hello
      </p>

      <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition mt-10"
        >
          See Results
      </Link>

      {/* Divider */}
      <div className="my-8 border-t border-gray-300"></div>

      {/* Raw Header Submission */}
      <div className="text-left">
        <h2 className="text-lg font-semibold mb-2">Check someone else’s email?</h2>
        <p className="text-sm text-gray-600 mb-3">
          Paste raw email headers below and analyze them without sending to the analyzer inbox.
        </p>
        <textarea
          className="w-full border rounded p-3 text-sm font-mono"
          rows={8}
          value={rawHeader}
          onChange={(e) => setRawHeader(e.target.value)}
          placeholder="Paste raw email headers here..."
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl shadow hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Analyze Header"}
        </button>
      </div>
    </div>
  );
}
