import { Table } from 'flowbite-react';
import { ITable } from './entities/table';
import { EnwTableHead } from './table.head';
import { EnwTableBoy } from './table.body';
import styles from "./table.module.css"

const EnwTable = ({ table} : {table: ITable | null }) => {
	return (
		<section className="w-full overflow-auto">
			<Table className={styles.table}>
				<EnwTableHead head={table?.head} />
				<EnwTableBoy body={table?.body} />
			</Table>
		</section>
	)
}

export { EnwTable }
