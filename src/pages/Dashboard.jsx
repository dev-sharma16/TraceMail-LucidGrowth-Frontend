import { useEffect, useState } from "react";
import axios from "../axios/axios.config";
import EmailCard from "../components/EmailCard";

export default function Dashboard() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/emails`)
      .then(res => setEmails(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4 text-center">Loading emails...</p>;

  return (
    <div className="px-4 py-6 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Processed Emails</h2>
      {emails.length === 0 ? (
        <p className="text-gray-600">No emails processed yet.</p>
      ) : (
        <div className="space-y-4">
          {emails.map(email => (
            <EmailCard key={email._id} email={email} />
          ))}
        </div>
      )}
    </div>
  );
}
