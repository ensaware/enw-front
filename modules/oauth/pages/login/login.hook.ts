import { useEffect, useRef, useState } from "react";
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

	const useOnSaveToken = (token: IToken) => {
		useEffect(() => {
			let isMounted = true;

			setLoading(true);
			facade.dispatchOnSaveToken(token);

			if(isMounted) {
				setLoading(false);
			}

			return () => {
				isMounted = false;
			};
		}, [token]);
	}

	const useCheckLogin = () => {
		useEffect(() => {
			let isMounted = true;

			setLoading(true);
			facade.dispatchCheckLogin();

			if(isMounted) {
				setLoading(false);
			}

			return () => {
				isMounted = false;
			};
		}, []);
	}

	return {
		loading,
		onAuthGoogle,
		onLogout,
		useCheckLogin,
		useOnSaveToken,
		showError: facade.showErrorState
	}
};

export { useLoginHook };
