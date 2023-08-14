"use client";

import { Button, Card, Label, Select, TextInput } from "flowbite-react";
import { IoSchoolOutline } from "react-icons/io5";
import { EnwSpinner } from "@/commons/components/spinner";
import styles from "./me.module.css";
import { useMeHook } from "./me.hook";

const Me = () => {
	const meHook = useMeHook()
	return (
		<>
			{meHook.loading && <EnwSpinner />}

			<Card className={styles.card}>
				<form
					className={styles.form}
					autoComplete="off"
					onSubmit={meHook.createFormik.handleSubmit}
				>
					<div>
						<div>
							<Label
								htmlFor="display_name"
								value="Nombre Completo"
							/>
						</div>

						<TextInput
							disabled
							id="display_name"
							required
							type="text"
							readOnly
							value={meHook.user.display_name}
						/>
					</div>

					<div>
						<div>
							<Label
								htmlFor="email"
								value="Correo Electrónico"
							/>
						</div>

						<TextInput
							disabled
							id="email"
							type="email"
							required
							readOnly
							value={meHook.user.email}
						/>
					</div>

					<div>
						<div>
							<Label
								htmlFor="career_id"
								value="Pregrado/Posgrado"
							/>
						</div>

						<Select
							color={meHook.createFormik.errors.career_id ? "failure" : ""}
							disabled={!!meHook.user.career}
							id="career_id"
							helperText={meHook.createFormik.errors.career_id ? meHook.createFormik.errors.career_id : ""}
							name="career_id"
							onChange={meHook.onChangeCareerId}
							required
							value={meHook.selectedCareer}
						>
							<option value="">Seleccionar...</option>
							{meHook.viewData?.map(item => (
								<option key={item.id} value={item.id}>
									{item.name}
								</option>
							))}
						</Select>
					</div>

					<Button className={styles.button} type="submit" disabled={!!meHook.user.career}>
						<IoSchoolOutline />
						&nbsp; Actualizar
					</Button>
				</form>
			</Card>
		</>
	)
}


export { Me }
