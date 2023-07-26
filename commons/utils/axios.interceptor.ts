import axios, { AxiosRequestConfig } from "axios";
import { toast } from "sonner";

import { IToken, IUser } from "@/commons/entities";

import { getToken, saveToken } from "./database";
import { LocalStorageKeys, getLocalStorage } from "./local.storage";
import { refreshToken } from "../services";

export const AxiosInterceptor = () => {
	const updateHeader = async (request: AxiosRequestConfig) => {
		const token: IToken | null = await getToken();

		const newHeaders = {
			Authorization: `${token?.token_type} ${token?.token}`,
		};

		request.headers = newHeaders;
		return request;
	};

	const getRefreshToken = async () => {
		let user: IUser = getLocalStorage(LocalStorageKeys.AUTH);
		const { data }: { data: IToken } = await refreshToken(user.provider);
		await saveToken(data);
	};

	axios.interceptors.request.use((request: any) => {
		if (request.url?.includes("authorization")) return request;

		return updateHeader(request);
	});

	axios.interceptors.response.use(
		(response: any) => {
			return response;
		},
		async (error) => {
			const messageError = "Ha ocurrido un error, ¡por favor intenta nuevamente!";

			if (error.response) {
				const { data } = error.response;
				if (
					data.code === 401 &&
					data.message.toLowerCase() === "token expirado."
				) {
					await getRefreshToken();
					toast.success(
						"Token actualizado. Por favor intenta nuevamente."
					);
					return Promise.reject(error);
				}

				let message: string =
					data.message ??
					messageError;

				toast.error(message);
			} else {
				toast.error(messageError);
			}

			return Promise.reject(error);
		}
	);
};
