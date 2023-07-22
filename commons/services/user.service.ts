import axios from "axios";

import { IToken } from "../entities";
import { environment } from "@/environments";
import { getToken, urlBuilder } from "@/commons/utils";

export const userRefreshToken = async (provider: string) => {
	const token: IToken | null = await getToken();

	let url: string = urlBuilder.services(
		environment.api.services.authorization,
		{
			provider: provider,
			version: "v1",
		}
	);
	url = `${url}/refresh/token`;

	return axios.post<IToken>(url, {
		refresh_token: token?.refresh_token,
	});
};
