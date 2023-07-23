import { Spinner } from "flowbite-react";
import styles from "./spinner.module.css";

const EnwSpinner = () => {
	return (
		<div className={styles.spinner}>
			<Spinner aria-label="Cargando..." color="success" />
		</div>
	)
}

export { EnwSpinner }
