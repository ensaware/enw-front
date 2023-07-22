import axios, { AxiosRequestConfig } from "axios";
import { toast } from "sonner";

import { IToken, IUser } from "@/commons/entities";
import { userRefreshToken } from "@/commons/services";

import { getToken, saveToken } from "./database";
import { LocalStorageKeys, getLocalStorage } from "./local.storage";

export const AxiosInterceptor = () => {
    const updateHeader = async (request: AxiosRequestConfig) => {
        const token: IToken | null = await getToken();

        const newHeaders = {
            Authorization: `${token?.token_type} ${token?.token}`,
            'Content-Type': 'application/json'
          };

          request.headers = newHeaders;
          return request;
    }

    const refreshToken = async () => {
        let user: IUser = getLocalStorage(LocalStorageKeys.AUTH);
        const { data } : { data: IToken } = await userRefreshToken(user.provider);
        await saveToken(data);
    }

    axios.interceptors.request.use((request: any) => {
        if (request.url?.includes('authorization'))
            return request;

        return updateHeader(request);
    });

    axios.interceptors.response.use(
        (response: any) => {
            return response;
        },
        async (error) => {
            const { data } = error.response;
            if (data.code === '401' && data.message.toLowerCase() === 'token expirado.') {
                await refreshToken();
                toast.success('Token actualizado. Por favor intenta nuevamente.');
                return Promise.reject(error);
            }

            let message: string = data.message ?? data.detail ?? 'Ha ocurrido un error, ¡por favor intenta nuevamente!';
            toast.error(message);

            return Promise.reject(error);
        }
    );
}
