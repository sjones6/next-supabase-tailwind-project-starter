import { createClient, type SupabaseClient } from "jsr:@supabase/supabase-js";
import type { ExpressRequest } from "./express.ts";
import type { Database } from "./supabase-types.ts";

export type Client = SupabaseClient<Database, "app">;

export const createSupabaseClient = (req: Request | ExpressRequest): Client => {
	const authorizationHeader =
		req.headers instanceof Headers
			? req.headers.get("Authorization")
			: req.headers.authorization;
	return createClient<Database, "app">(
		Deno.env.get("SUPABASE_URL") ?? "",
		Deno.env.get("SUPABASE_ANON_KEY") ?? "",
		{
			global: {
				headers: {
					Authorization:
						typeof authorizationHeader === "string" ? authorizationHeader : "",
				},
			},
		},
	);
};

export const createAdminSupabaseClient = (): Client => {
	return createClient<Database, "app">(
		Deno.env.get("SUPABASE_URL") ?? "",
		Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
		{
			auth: {
				autoRefreshToken: false,
				persistSession: false,
			},
		},
	);
};
