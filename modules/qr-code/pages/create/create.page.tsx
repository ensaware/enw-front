"use client";

import { EnwSpinner } from "@/commons/components/spinner";
import { Alert, Button, Card, FileInput, Label, TextInput, ToggleSwitch } from "flowbite-react";

import styles from "./create.module.css";

const CreateQRCode = () => {
	return (
		<section>
			{/* {createHook.loading && <EnwSpinner />} */}

			<Card className={styles.card}>
				{/* {createHook.library && (
					<Alert color="success" icon={GiSpellBook}>
						Se ha registrado correctamente el libro { createHook.library.library.title }.
					</Alert>
				)} */}

				<form
					className={styles.form}
					autoComplete="off"
					// onSubmit={createHook.createFormik.handleSubmit}
				>
					<ToggleSwitch
						label="Mostrar logo de la Corporación Universitaria Americana"
						checked={false}
						color="success"
						onChange={()=>{}}
					/>

					<Button className={styles.button} type="submit">
						Crear
					</Button>
				</form>
			</Card>
		</section>
	)
}

export { CreateQRCode }
