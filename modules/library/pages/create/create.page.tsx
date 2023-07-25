"use client";

import { useRef, useState } from "react";
import { Button, Card, FileInput, Label } from "flowbite-react"
import { isMobile } from "react-device-detect";
import styles from "./create.module.css";
import Webcam from "react-webcam";
import { useCreateHook } from "./create.hook";

const CreateLibrary = () => {
	const createHook = useCreateHook();

	const videoConstraints = {
		facingMode: "environment"
	};

	return (
		<section>
			<Card>
				<form encType="multipart/form-data" className={styles.form}>
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
								helperText="Por favor subir la foto del código de barra de libro en muy buena calidad."
								id="file"
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
