import { Table } from "flowbite-react";
import { ITableBody } from "./entities/table";

import styles from "./table.module.css"

const EnwTableBoy = ({ body } : { body: ITableBody[] | null | undefined }) => {
	return (
		<Table.Body className="divide-y">
			{body?.map(item => (
				<Table.Row key={item.id + "-row"} className={styles.tr}>
					{item.value.map((row, index) => (
						<Table.Cell key={`${item.id}-cell-${index}`}>
							{row}
						</Table.Cell>
					))}
				</Table.Row>
			))}
		</Table.Body>
	)
}

export { EnwTableBoy }
