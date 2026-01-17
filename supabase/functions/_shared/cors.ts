import type { ExpressRequest } from "./express.ts";

export const corsHeaders = {
	"Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "*",
	"Access-Control-Allow-Headers":
		"authorization, x-client-info, apikey, content-type",
};

// biome-ignore lint/style/noNonNullAssertion: this env var is on by default in supabase
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const allowedOrigins = Deno.env.get("ALLOWED_ORIGINS")?.split(",") || ["*"];

const allowedOriginRegexes = allowedOrigins.map((pattern) => {
	if (pattern === "*") return /.*/;
	if (!pattern.includes("*")) return new RegExp(`^${pattern}$`);
	return new RegExp(`^${pattern.replace(/\*/g, ".*")}$`);
});

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";

export const getCorsHeaders = (
	req: Request | ExpressRequest,
	allowedMethods: HTTPMethod[] = ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
) => {
	const origin =
		req.headers instanceof Headers
			? req.headers.get("origin")
			: req.headers.origin;

	const isAllowed =
		origin && allowedOriginRegexes.some((regex) => regex.test(origin));
	return {
		"Access-Control-Allow-Origin": isAllowed ? origin : supabaseUrl,
		"Access-Control-Allow-Headers":
			"authorization, x-client-info, apikey, content-type",
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Allow-Methods": allowedMethods.join(", "),
	};
};
