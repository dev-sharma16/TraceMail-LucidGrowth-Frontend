import { MailOpen, Server, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function EmailCard({ email }) {
  const navigate = useNavigate()

  return (
    <div 
      className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate(`/emails/${email._id}`)}
    >
      {/* Subject + ESP Provider */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{email.subject}</h3>
        <span className="text-sm text-gray-500 flex items-center gap-1">
          <Globe size={16} />
          {email.esp?.provider || "Unknown"}
        </span>
      </div>

      {/* From / To */}
      <p className="text-sm text-gray-600 mt-1">
        From: {email.from} → To: {email.to?.join(", ")}
      </p>

      {/* ESP Details */}
      {email.esp && (
        <div className="mt-3">
          <h4 className="font-medium mb-1">ESP Details</h4>
          <div className="bg-blue-50 p-2 rounded text-sm">
            <p><span className="font-semibold">Provider:</span> {email.esp.provider}</p>
            <p><span className="font-semibold">Confidence:</span> {email.esp.confidence}</p>
            {email.esp.reasons?.length > 0 && (
              <div className="mt-1">
                <span className="font-semibold">Reasons:</span>
                <ul className="list-disc list-inside text-xs text-gray-700 mt-1">
                  {email.esp.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Receiving Chain */}
      <div className="mt-4">
        <h4 className="font-medium mb-1 flex items-center gap-1">
          <Server size={16} /> Receiving Chain
        </h4>
        {email.receivingChain?.length > 0 ? (
          <ul className="text-xs bg-gray-50 p-2 rounded space-y-1">
            {email.receivingChain.map((hop, i) => (
              <li key={i}>
                {i + 1}. {hop.by} ← {hop.from} ({hop.ip})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-gray-500">No chain data available.</p>
        )}
      </div>
    </div>
  );
}
