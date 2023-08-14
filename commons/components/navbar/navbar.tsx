"use client";

import Link from "next/link";
import { IoReorderThree } from "react-icons/io5";
import { HiOutlineLibrary, HiOutlineLogout, HiOutlineQrcode, HiOutlineUser } from 'react-icons/hi';
import { Avatar, Dropdown, Navbar, Sidebar } from "flowbite-react";
import styles from "./navbar.module.css";
import { useState } from "react";
import { IUser } from "@/commons/entities";
import { LocalStorageKeys, getLocalStorage } from "@/commons/utils";
import { useLoginHook } from "@/modules/oauth/pages/login/login.hook";

const EnwNavBar = () => {
	const loginHook = useLoginHook();

	const [openSubNavbar, setOpenSubNavbar] = useState<boolean>(false);
	const [user] = useState<IUser>(getLocalStorage(LocalStorageKeys.AUTH));

	const onChangeSubNavbar = () => {
		setOpenSubNavbar(!openSubNavbar);
	}

	return (
		<>
			<Navbar fluid className={styles.navbar} style={{zIndex: 9999}}>
				<Navbar.Brand>
					<IoReorderThree className={styles.menu} onClick={onChangeSubNavbar} />
					<span className="self-center whitespace-nowrap text-xl font-semibol">
						Ensaware
					</span>
				</Navbar.Brand>

				<section className="flex md:order-last">
					<Dropdown
						inline
						label={<Avatar alt={user.display_name} img={user.picture ? user.picture : ''} rounded />}
					>
						<Dropdown.Header>
							<span className="block text-sm">
								{user.display_name}
							</span>
							<span className="block truncate text-sm font-medium">
								{user.email}
							</span>
						</Dropdown.Header>

						<Dropdown.Item as={Link} href="/enw/me">
							<HiOutlineUser />
							&nbsp; Perfil
						</Dropdown.Item>

						<Dropdown.Divider />

						<Dropdown.Item onClick={loginHook.onLogout}>
							<HiOutlineLogout />
							&nbsp; Cerrar Sesión
						</Dropdown.Item>
					</Dropdown>
				</section>
			</Navbar>

			<section className={`${styles.subnavbar} ${openSubNavbar ? "flex": "hidden"}`}>
				<Sidebar aria-label="Sidebar with multi-level dropdown example">
					<Sidebar.Items>
						<Sidebar.ItemGroup>
							<Sidebar.Collapse
								icon={HiOutlineLibrary}
								label="Biblioteca"
							>
								<Sidebar.Item as={Link} href="/enw/library/create">
									Registrar libro
								</Sidebar.Item>

								<Sidebar.Item as={Link} href="/enw/library/view">
									Ver libros registrados
								</Sidebar.Item>
							</Sidebar.Collapse>

							<Sidebar.Collapse
								icon={HiOutlineQrcode}
								label="Código QR"
							>
								<Sidebar.Item as={Link} href="/enw/qr-code/create">
									Crear Código QR
								</Sidebar.Item>

								<Sidebar.Item as={Link} href="#">
									Ver Códigos QR creados
								</Sidebar.Item>
							</Sidebar.Collapse>

							{/* <Sidebar.Item
								href="#"
								icon={HiInbox}
							>
								Registrar libro
							</Sidebar.Item> */}
						</Sidebar.ItemGroup>
					</Sidebar.Items>
				</Sidebar>
			</section>
		</>
	)
}

export { EnwNavBar }
