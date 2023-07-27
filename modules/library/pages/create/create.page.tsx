"use client";

import { Alert, Button, Card, FileInput, Label } from "flowbite-react"
import { GiSpellBook } from "react-icons/gi";

import styles from "./create.module.css";
import { useCreateHook } from "./create.hook";

import { EnwSpinner } from "@/commons/components/spinner";

const CreateLibrary = () => {
	const createHook = useCreateHook();

	return (
		<section>
			{createHook.loading && <EnwSpinner />}

			<Card className={styles.card}>
				{createHook.library && (
					<Alert color="success" icon={GiSpellBook}>
						Se ha registrado correctamente el libro { createHook.library.library.title }.
					</Alert>
				)}

				<form
						className={styles.form}
						autoComplete="off"
						onSubmit={createHook.createFormik.handleSubmit}
					>
						<div>
							<div className="mb-2 block">
								<Label
									htmlFor="file"
									value="Subir foto"
								/>
							</div>

							<FileInput
								accept='image/*'
								color={createHook.createFormik.errors.image ? "failure" : ""}
								id="file"
								helperText={createHook.createFormik.errors.image ? createHook.createFormik.errors.image : "Por favor subir la foto del código de barra de libro en muy buena calidad."}
								name="image"
								onChange={createHook.onChangeImage}
							/>
						</div>

						<Button className={styles.button} type="submit">
							Crear
						</Button>
					</form>
			</Card>
		</section>
	)
}

export { CreateLibrary }
