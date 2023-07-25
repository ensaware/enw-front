"use client";

import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import { Alert, Button } from "flowbite-react";
import { IoLogoGoogle, IoLogInOutline, IoWarningOutline } from "react-icons/io5";

import imgLogin from "@/public/img/login.jpg"
import imgLogoAmericana from "@/public/img/logoAmericana.png"
import { IToken } from "@/commons/entities";
import styles from "@/modules/oauth/pages/login/login.module.css";
import { useLoginHook } from "./login.hook";
import { EnwSpinner } from "@/commons/components/spinner";

const Login = () => {
	const params = useSearchParams();
	const loginHook = useLoginHook();

	loginHook.useCheckLogin();

	const token: string | null = params.get('token');
    const token_type: string | null = params.get('token_type');
    const refresh_token: string | null = params.get('refresh_token');

    if (token && token_type && refresh_token) {
        const tokenData: IToken = {
            token,
            token_type,
            refresh_token
        }

        loginHook.useOnSaveToken(tokenData);
    }

	return (
		<main className={styles.main}>
			{loginHook.loading && <EnwSpinner />}

			<section className={styles.left}>
				<Image
					src={imgLogin}
					alt="Iniciar sesión"
					priority={true}
				/>
			</section>

			<section className={styles.right}>
				{loginHook.showError &&
					<Alert color="failure" icon={IoWarningOutline} className="mb-10">
						Error al iniciar sesión. Por favor vuelva a intentar.
					</Alert>
				}

				<h1>Ensaware</h1>

				<div className={styles.login}>
					<IoLogInOutline />
					<h2>Iniciar Sesión</h2>
				</div>

				<Image
					src={imgLogoAmericana}
					alt="Logo Corporación Universitaria Americana"
					width={250}
					height={250}
					priority={true}
				/>

				<p>
					La aplicación Ensaware solo permite iniciar sesión con el correo electrónico institucional.
				</p>

				<Button onClick={loginHook.onAuthGoogle}>
					<IoLogoGoogle />
					Iniciar Sesión.
				</Button>
			</section>
		</main>
	);
};

export { Login }
