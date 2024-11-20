import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("profiler")
      .select("*")
      .limit(1);
    if (error) {
      console.error("Database connection failed:", error.message);
    } else {
      console.log("Database connection successful. Sample data:", data);
    }
  } catch (err) {
    console.error("Unexpected error during database connection test:", err);
  }
};

export { supabase, testConnection };
