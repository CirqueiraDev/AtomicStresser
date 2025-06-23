"use client";
import { createContext, useContext, useState } from "react";

interface AttackContextType {
  refreshAttacks: boolean;
  triggerRefresh: () => void;
}

const AttackContext = createContext<AttackContextType>({
  refreshAttacks: false,
  triggerRefresh: () => {},
});

export const useAttackContext = () => useContext(AttackContext);

export function AttackProvider({ children }: { children: React.ReactNode }) {
  const [refreshAttacks, setRefreshAttacks] = useState(false);

  const triggerRefresh = () => {
    setRefreshAttacks(true);
    setTimeout(() => setRefreshAttacks(false), 100); // evita bug de atualização contínua
  };

  return (
    <AttackContext.Provider value={{ refreshAttacks, triggerRefresh }}>
      {children}
    </AttackContext.Provider>
  );
}
