import axios from "axios";
import { environment } from "@/environments";
import { getToken, urlBuilder } from "@/commons/utils";
import { IToken } from "@/commons/entities";

export const login = (provider: string) => {
	let url: string = urlBuilder.services(
		environment.api.services.authorization,
		{
			provider: provider,
			version: "v1",
		}
	);

	window.location.href = url;
};


export const refreshToken = async (provider: string) => {
	const token: IToken | null = await getToken();

	let url: string = urlBuilder.services(
		environment.api.services.authorization,
		{
			provider: provider,
			version: "v1",
		}
	);
	url = `${url}/refresh/token`;

	return await axios.post<IToken>(url, {
		refresh_token: token?.refresh_token,
	});
};
