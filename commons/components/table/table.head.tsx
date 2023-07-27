import { Table } from "flowbite-react";
import { ITableHead } from "./entities/table";

import styles from "./table.module.css"

const EnwTableHead = ( { head } : { head : ITableHead[] | null | undefined }) => {
	return (
		<Table.Head>
			{head?.map((item, index) => (
				<Table.HeadCell key={index} className={styles.thead}>
					{item.value}
				</Table.HeadCell>
			))}
		</Table.Head>
	)
}

export { EnwTableHead }
