import { environment } from "@/environments";
import { urlBuilder } from "@/commons/utils";

export const tokenService = (provider: string) => {
	let url: string = urlBuilder.services(
		environment.api.services.authorization,
		{
			provider: provider,
			version: "v1",
		}
	);

	url = `${url}/}`;

	window.location.href = url;
};
