import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "../supabase-types";

export function createClient() {
	return createBrowserClient<Database>(
		// biome-ignore lint/style/noNonNullAssertion: variable is set in .env
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		// biome-ignore lint/style/noNonNullAssertion: variable is set in .env
		process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
	);
}
