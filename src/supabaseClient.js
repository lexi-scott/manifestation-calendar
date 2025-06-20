// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://heatvlnpuvgacxejdllb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlYXR2bG5wdXZnYWN4ZWpkbGxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzOTIzMjMsImV4cCI6MjA2NTk2ODMyM30.ra28d3JYv_cJYgu2Ych_yV33wE3Q5nU-Cm5YehEymO0";

export const supabase = createClient(supabaseUrl, supabaseKey);

import { supabase } from "../supabaseClient";

// insert
await supabase.from("cycle_phases").insert({
  user_id: "lexi",
  date: "2025-06-24",
  phase: "Luteal",
  source: "manual"
});

// fetch
const { data, error } = await supabase
  .from("cycle_phases")
  .select("*")
  .eq("user_id", "lexi")
  .order("date", { ascending: true });
