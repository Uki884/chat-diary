'use client';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const supabase = createClientComponentClient();

  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  )
}