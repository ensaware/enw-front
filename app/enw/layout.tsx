"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EnwNavBar } from "@/commons/components/navbar/navbar";
import { EnwSpinner } from "@/commons/components/spinner";
import { IToken } from "@/commons/entities";
import { getToken } from "@/commons/utils";

export default function EnwLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(true);
	const [token, setToken] = useState<IToken | null>(null);

	useEffect(() => {
		let isMounted = true;

		setLoading(true);

		const check = async () => {
			const tokenData: IToken | null = await getToken();

			if(isMounted) {
				setToken(tokenData);

				if(!tokenData) {
					router.push("/");
				}
				setLoading(false);
			}
		}

		check();
		return () => {
			isMounted = false;
		};
	}, []);

	return (
		<>
			{loading && <EnwSpinner />}

			{token &&
				<>
					<EnwNavBar />
					<main className="md:ml-64 pl-5 pt-5 mr-4">
						{children}
					</main>
				</>
			}
		</>
	)
}
