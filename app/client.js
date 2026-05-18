import { createClient } from "@supabase/supabase-js";

const URL = "https://bpywrhmnqwqqyutzzlbm.supabase.co";
const API_KEY = "sb_publishable_xfTOfvNcCXPZuLpAuKzEpg_bdBN3dOX";

const options = {};

// Node.js < 22 has no native WebSocket (needed during SSR)
if (typeof window === "undefined") {
  const ws = (await import("ws")).default;
  options.realtime = { transport: ws };
}

export const supabase = createClient(URL, API_KEY, options);
