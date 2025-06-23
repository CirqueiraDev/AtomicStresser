"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Bomb } from "lucide-react";

const l7Methods = [
  { name: "GET", description: "Sends mass GET requests" },
  { name: "POST", description: "Sends continuous POST requests" },
  { name: "OVH", description: "Bypasses OVH protection" },
  { name: "RHEX", description: "Random HEX headers" },
  { name: "STOMP", description: "Skips checks like captcha" },
  { name: "STRESS", description: "Heavy HTTP packet load" },
  { name: "BYPASS", description: "Bypass Normal AntiDDoS" },
  { name: "CFBUAM", description: "CloudFlare Under Attack Mode Bypass" },
  { name: "CFB", description: "CloudFlare Bypass" },
  { name: "COOKIE", description: "Random cookies per request" },
  { name: "PPS", description: "Raw minimal HTTP packet" },
  { name: "EVEN", description: "GET request with extra headers" },
];

const l4Methods = [
  { name: "TCP", description: "TCP connection flood" },
  { name: "UDP", description: "UDP packet flood" },
  { name: "SYN", description: "Mass SYN packet flood" },
  { name: "CPS", description: "Rapid open/close connections" },
  { name: "OVH UDP", description: "Floods the target port with UDP datagrams containing random payloads" },
  { name: "OVH TCP", description: "Randomizes bytes (0x00 to 0xFF) and line terminators to bypass WAFs" },
  { name: "VSE", description: "Valve Source Engine protocol ping" },
  { name: "TS3", description: "TeamSpeak 3 status ping" },
  { name: "DISCORD", description: "Sends a specialized UDP packet designed to Discord" },
  { name: "FIVEM", description: "FiveM confirmation token flood" },
  { name: "MCPE", description: "Minecraft PE Status Ping Protocol" },
  { name: "MCBOT", description: "Minecraft Bot Attack" },
];

const ampMethods = [
  { name: "MEM", description: "Memcached amplification" },
  { name: "NTP", description: "Network Time Protocol amplification" },
  { name: "DNS ", description: "Domain Name System amplification" },
  { name: "CHAR", description: "Chargen amplification" },
  { name: "CLDAP ", description: "Connection-less LDAP amplification" },
  { name: "ARD", description: "Apple Remote Desktop amplification" },
  { name: "RDP", description: "Remote Desktop Protocol amplification" },
];

export function MethodsSection() {
  const [selectedLayer, setSelectedLayer] = useState<"L4" | "L7" | "AMP">("AMP");

  const methods = selectedLayer === "L7" ? l7Methods : selectedLayer === "L4" ? l4Methods : ampMethods;

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 md:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-10 text-center"
      >
        Attack Methods
      </motion.h2>

      <div className="flex justify-center gap-4 mb-8">
        {(["L7", "L4", "AMP"] as const).map((layer) => (
          <button
            key={layer}
            onClick={() => setSelectedLayer(layer)}
            className={`px-6 py-2 rounded-lg font-semibold border-2 transition-all ${selectedLayer === layer
                ? "bg-primary text-white border-primary"
                : "bg-transparent text-text border-muted hover:border-primary"
              }`}
          >
            {layer === "L7" ? "Layer 7" : layer === "L4" ? "Layer 4" : "AMP"}
          </button>
        ))}
      </div>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {methods.map((method, idx) => (
            <motion.div
              key={method.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-panel border border-muted rounded-lg p-4 flex items-start gap-3"
            >
              <Bomb className="text-primary mt-1" size={20} />
              <div>
                <h4 className="font-bold text-white mb-1">{method.name}</h4>
                <p className="text-sm text-text">{method.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          This is just a preview — many more advanced methods are available inside the platform.
        </p>
      </div>
    </section>
  );
}
