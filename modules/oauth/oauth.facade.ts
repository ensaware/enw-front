import { useState } from "react";
import { useRouter } from 'next/navigation';

import { clearLocalStorage, deleteToken, saveToken } from "@/commons/utils";
import { tokenService } from "./services/token.service";
import { IToken } from "@/commons/entities";

const OAuthFacade = () => {
	const router = useRouter();

	const [showErrorState, setShowErrorState] = useState<boolean>(false);

	const dispatchLogout = async () => {
        clearLocalStorage();
		await deleteToken();
		router.push("/");
    }

	const dispatchProviderGoogle = () => {
		tokenService("google");
	}

	const dispatchOnSaveToken = async (token: IToken) => {
		try {
			await saveToken(token);
			router.push("/enw");
		} catch {
			setShowErrorState(true);
		}
	}

	return {
		dispatchLogout,
		dispatchProviderGoogle,
		dispatchOnSaveToken,
		showErrorState
	}
}

export { OAuthFacade }
