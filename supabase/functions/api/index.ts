import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import type { HTTPMethod } from "../_shared/cors.ts";
import { cors, express, supabase } from "../_shared/express.ts";

const app = express();

const allowedMethods: HTTPMethod[] = ["POST", "OPTIONS"];

const port = Deno.env.has("PORT")
	? // biome-ignore lint/style/noNonNullAssertion: just checked existence above
		Number.parseInt(Deno.env.get("PORT")!, 10)
	: 3000;

app.use(cors(allowedMethods), supabase);

app.use(express.json());

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
