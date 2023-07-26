"use client";

import { useRef, useState } from "react";
import { Button, Card, FileInput, Label } from "flowbite-react"
import { isMobile } from "react-device-detect";
import styles from "./create.module.css";
import Webcam from "react-webcam";
import { useCreateHook } from "./create.hook";
import { EnwSpinner } from "@/commons/components/spinner";

const CreateLibrary = () => {
	const createHook = useCreateHook();

	const videoConstraints = {
		facingMode: "environment"
	};

	return (
		<section>
			{createHook.createFormik.isSubmitting ?? console.log("enviando petición....")}

			<Card className={styles.card}>
				<form
					className={styles.form}
					autoComplete="off"
					onSubmit={createHook.createFormik.handleSubmit}
				>
					{isMobile ? (
						<>
							<Webcam
								audio={false}
								screenshotFormat="image/png"
								videoConstraints={videoConstraints}
							/>

							<Button onClick={createHook.capture} className={styles.buttonCapture}>
								Tomar foto
							</Button>
						</>
					) : (
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
					)}

					<Button className={styles.button} type="submit">
						Crear
					</Button>
				</form>
			</Card>
		</section>
	)
}

export { CreateLibrary }
