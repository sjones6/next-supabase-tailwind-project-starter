// @ts-types="npm:@types/express@5.0.3"

// biome-ignore lint/correctness/noUnusedImports: This is used in the edge runtime but needed for some weird deno reason
import _express, {
	type Request as ExpressRequest,
	type Response as ExpressResponse,
	type NextFunction,
} from "npm:express@5.1.0";
import type { Client } from "./client.ts";
import { createSupabaseClient } from "./client.ts";
import { getCorsHeaders, type HTTPMethod } from "./cors.ts";

type SupabaseAuthUser = {
	id: string;
	aud: string;
	confirmation_sent_at?: string;
	recovery_sent_at?: string;
	email_change_sent_at?: string;
	new_email?: string;
	new_phone?: string;
	invited_at?: string;
	action_link?: string;
	email?: string;
	phone?: string;
	created_at: string;
	confirmed_at?: string;
	email_confirmed_at?: string;
	phone_confirmed_at?: string;
	last_sign_in_at?: string;
	role?: string;
	updated_at?: string;
	is_anonymous?: boolean;
};

declare global {
	namespace Express {
		interface Request {
			supabase: Client;
			user: SupabaseAuthUser;
		}
	}
}

export type Middleware = (
	req: ExpressRequest,
	res: ExpressResponse,
	next: NextFunction,
) => void;

export const wrap =
	(middleware: Middleware): Middleware =>
	async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
		try {
			await middleware(req, res, next);
		} catch (error) {
			console.error(error);
			if (!res.headersSent) {
				res.status(500).send("Internal Server Error");
			}
		}
	};

/**
 * Adds CORS headers to the response and handles OPTIONS requests.
 *
 * This assumes a standard set of allowed methods.
 */
export const cors = (
	allowedMethods: HTTPMethod[] = ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
): Middleware =>
	wrap((req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
		res.set({
			...getCorsHeaders(req, allowedMethods),
		});

		if (req.method === "OPTIONS") {
			res.status(200).end();
			return;
		}

		next();
	});

/**
 * Adds a supabase client to the request object.
 */
export const supabase = wrap(
	async (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
		req.supabase = createSupabaseClient(req);
		const { data: user, error: userError } = await req.supabase.auth.getUser();
		if (userError) {
			console.error("User not found", userError);
			res.status(401).send("Unauthorized");
			return;
		}
		if (!user.user) {
			res.status(401).send("Unauthorized");
			return;
		}
		req.user = user.user;
		next();
	},
);

export type {
	NextFunction,
	Request as ExpressRequest,
	Response as ExpressResponse,
} from "npm:express@5.1.0";
export {
	default as express,
	Router,
} from "npm:express@5.1.0";
