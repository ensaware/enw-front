"use client";

import { GiBookshelf } from "react-icons/gi";
import { EnwSpinner } from "@/commons/components/spinner";
import { EnwTable } from "@/commons/components/table";

import { useViewHook } from "./view.hook"
import styles from "./view.module.css"

const ViewLibrary = () => {
	const viewHook = useViewHook();

	return (
		<>
			{viewHook.loading && <EnwSpinner />}

			<section className={styles.section}>
				<h2 className={styles.h2}>
					<GiBookshelf />
					Histórico de libros consultados.
				</h2>
				<EnwTable table={viewHook.table} />
			</section>
		</>
	)
}

export { ViewLibrary }
