"use client";
import { useState } from "react";
import { Copy } from "lucide-react";
import { motion } from "framer-motion";

const apiLink = "https://api.yourapi.ru/api";

const fields = [
  { field: "key", description: "Your API Key", value: "cm...kpg9q", required: true },
  { field: "ip", description: "Target IPv4/Subnet or URL", value: "74.74.74.8, 74.74.74.8/24, https://google.com", required: true },
  { field: "port", description: "Target Port", value: "0 - 65565", required: true },
  { field: "time", description: "Test duration", value: "30 or longer (in seconds)", required: true },
  { field: "method", description: "Method requested", value: "see available methods below", required: true },
  { field: "concurrents", description: "Concurrents to send", value: "1, 2, 3 (depends on your plan)", required: false },
  { field: "requests", description: "Requests per proxy", value: "64, 128, 256, 512", required: false },
  { field: "payload", description: "Layer for attacks (Layer7 or Layer4)", value: "Layer7, Layer4, Layer7_premium, Layer4_premium", required: false },
];

export default function ApiDocs() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen p-6 text-white">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-center">API Reference</h1>

        {/* API Link */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">API Link</h2>
          <div className="bg-panel border border-gray-700 rounded-lg px-4 py-3 flex items-center justify-between">
            <code className="text-blue-400 break-all">{apiLink}</code>
            <button onClick={() => copyToClipboard(apiLink)}>
              <Copy size={18} className="text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>

        {/* API Fields Table */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">API Fields</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300 border border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-gray-100 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Field</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Value</th>
                  <th className="px-4 py-3">Required</th>
                </tr>
              </thead>
              <tbody className="bg-panel">
                {fields.map((item, i) => (
                  <tr key={i} className="border-t border-gray-700">
                    <td className="px-4 py-3 font-medium text-white">{item.field}</td>
                    <td className="px-4 py-3">{item.description}</td>
                    <td className="px-4 py-3 text-blue-400">{item.value}</td>
                    <td className="px-4 py-3">
                      {item.required ? "✔️" : "❌"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Example: Ongoing Tests */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Ongoing Tests</h2>
          <p className="text-sm text-gray-400 mb-2">Use this link to retrieve ongoing tests:</p>
          <div className="bg-panel border border-gray-700 rounded-lg px-4 py-3 flex items-center justify-between">
            <code className="break-all">{apiLink}/ongoing?key=cm...kpg9q</code>
            <button onClick={() => copyToClipboard({apiLink}+"/ongoing?key=cm...kpg9q")}>
              <Copy size={18} className="text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>

        {/* Example: Stop Test */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Stop Ongoing Test</h2>
          <p className="text-sm text-gray-400 mb-2">Stop a test using its ID:</p>
          <div className="bg-panel border border-gray-700 rounded-lg px-4 py-3 flex items-center justify-between">
            <code className="break-all">{apiLink}/stop?key=cm...kpg9q&id=TEST_ID</code>
            <button onClick={() => copyToClipboard({apiLink}+"/stop?key=cm...kpg9q&id=TEST_ID")}>
              <Copy size={18} className="text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>

        {/* Feedback copy status */}
        {copied && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-4 right-4 bg-green-600 px-4 py-2 rounded shadow-lg"
          >
            Copied to clipboard!
          </motion.div>
        )}
      </div>
    </div>
  );
}
