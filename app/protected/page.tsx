import { redirect } from "next/navigation";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";

async function UserInfo() {
	const supabase = await createClient();
	const { data, error } = await supabase.auth.getUser();

	if (error || !data?.user) {
		redirect("/auth/login");
	}

	return (
		<p className="text-muted-foreground">
			You are logged in as {data.user.email}
		</p>
	);
}

export default function ProtectedPage() {
	return (
		<div className="flex-1 w-full flex flex-col gap-12">
			<h1 className="text-2xl font-bold">Protected Page</h1>
			<Suspense fallback={<p className="text-muted-foreground">Loading...</p>}>
				<UserInfo />
			</Suspense>
		</div>
	);
}
