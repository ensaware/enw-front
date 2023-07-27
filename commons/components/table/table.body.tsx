import { Table } from "flowbite-react";
import { ITableBody } from "./entities/table";

import styles from "./table.module.css"

const EnwTableBoy = ({ body } : { body: ITableBody[] | null | undefined }) => {
	return (
		<Table.Body className="divide-y">
			{body?.map((item, indexItem) => (
				<Table.Row key={indexItem + "-row"} className={styles.tr}>
					{item.value.map((row, indexRow) => (
						<Table.Cell key={indexRow + "-cell"}>
							{row}
						</Table.Cell>
					))}
				</Table.Row>
			))}
		</Table.Body>
	)
}

export { EnwTableBoy }
