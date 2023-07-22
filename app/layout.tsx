"use client";

import { Roboto } from "next/font/google"
import "./globals.css";

import { AxiosInterceptor } from '@/commons/utils';


const roboto = Roboto({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    fallback: ["Helvetica", "Arial", "sans-serif"],
	variable: '--font-roboto'
});

AxiosInterceptor();
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es-CO">
			<head>
				<title>Ensaware</title>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</head>
			<body className={roboto.className}>
				{children}
			</body>
		</html>
	);
}
