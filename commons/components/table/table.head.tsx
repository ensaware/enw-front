import { Table } from "flowbite-react";
import { ITableHead } from "./entities/table";

import styles from "./table.module.css"

const EnwTableHead = ( { head } : { head : ITableHead[] | null | undefined }) => {
	return (
		<Table.Head>
			{head?.map(item => (
				<Table.HeadCell key={item.id} className={styles.th}>
					{item.value}
				</Table.HeadCell>
			))}
		</Table.Head>
	)
}

export { EnwTableHead }
