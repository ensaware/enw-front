"use client";

import Image from "next/image";
import { Alert, Button } from "flowbite-react";
import { IoLogoGoogle, IoLogInOutline, IoWarningOutline } from "react-icons/io5";

import imgLogin from "@/public/img/login.jpg"
import imgLogoAmericana from "@/public/img/logoAmericana.png"
import styles from "@/modules/oauth/pages/login/login.module.css";

const Login = () => {
	return (
		<main className={styles.main}>
			<section className={styles.left}>
				<Image
					src={imgLogin}
					alt="Iniciar sesión"
					priority={true}
				/>
			</section>

			<section className={styles.right}>
				<Alert color="failure" icon={IoWarningOutline} className="mb-10">
					Error al iniciar sesión. Por favor vuelva a intentar.
				</Alert>

				<h1>Ensaware</h1>

				<div className="login">
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

				<Button>
					<IoLogoGoogle />
					Iniciar Sesión.
				</Button>
			</section>
		</main>
	);
};

export { Login }
