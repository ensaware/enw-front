import { useState } from "react";
import { useRouter } from 'next/navigation';

import { LocalStorageKeys, clearLocalStorage, deleteToken, getToken, saveToken, setLocalStorage } from "@/commons/utils";
import { IToken, IUser } from "@/commons/entities";
import { login, me } from "@/commons/services";

const OAuthFacade = () => {
	const router = useRouter();

	const [showErrorState, setShowErrorState] = useState<boolean>(false);

	const dispatchLogout = async () => {
        clearLocalStorage();
		await deleteToken();
		router.push("/");
    }

	const dispatchProviderGoogle = () => {
		login("google");
	}

	const dispatchOnSaveToken = async (token: IToken) => {
		try {
			await saveToken(token);
			const { data }: { data: IUser } = await me();

			if (data) {
				setLocalStorage(LocalStorageKeys.AUTH, JSON.stringify(data));
				router.push("/enw");
			} else {
				setShowErrorState(true);
			}
		} catch (error) {
			setShowErrorState(true);
		}
	}

	const dispatchCheckLogin = async () => {
		const tokenData: IToken | null = await getToken();
		if (tokenData) {
			router.push("/enw");
		}
	}

	return {
		dispatchCheckLogin,
		dispatchLogout,
		dispatchProviderGoogle,
		dispatchOnSaveToken,
		showErrorState
	}
}

export { OAuthFacade }
