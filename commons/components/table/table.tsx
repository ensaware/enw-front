import { Table } from 'flowbite-react';
import { ITable } from './entities/table';
import { EnwTableHead } from './table.head';
import { EnwTableBoy } from './table.body';

const EnwTable = ({ table} : {table: ITable | null }) => {
	return (
		<section className="w-full overflow-auto">
			<Table>
				<EnwTableHead head={table?.head} />
				<EnwTableBoy body={table?.body} />
			</Table>
		</section>
	)
}

export { EnwTable }
