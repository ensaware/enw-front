import { useState } from "react";
import { OAuthFacade } from "../../oauth.facade";
import { IToken } from "@/commons/entities";


const useLoginHook = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const facade = OAuthFacade();

	const onAuthGoogle = async () => {
		setLoading(true);
		facade.dispatchProviderGoogle();
		setLoading(false);
	};

	const onLogout = async () => {
		setLoading(true);
		await facade.dispatchLogout();
		setLoading(false);
	}

	const onSaveToken = async (token: IToken) => {
		setLoading(true);
		await facade.dispatchOnSaveToken(token);
		setLoading(false);
	}

	return {
		loading,
		onAuthGoogle,
		onLogout,
		onSaveToken,
		showError: facade.showErrorState
	}
};

export { useLoginHook };
