import { useEffect, useState } from "react";

import { ILibraryPagination } from "@/commons/entities"
import { view } from "@/commons/services";
import { ITable, ITableBody, ITableHead } from "@/commons/components/table";

const useViewHook = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [viewData, setViewData] = useState<ILibraryPagination | null>(null);
	const [table, setTable] = useState<ITable | null>(null);

	useEffect(() => {
		let isMounted = true;
		setLoading(true);

		const fetchData = async () => {
			try {
				const { data } : { data: ILibraryPagination } = await view();

				if(isMounted) {
					setViewData(data);

					const body: ITableBody[] = data.items?.map((item) => ({
						value: [
							item.id.slice(0, 8),
							`${item.library.title}${item.library.subtitle ? ` - ${item.library.subtitle}` : ""}`,
							item.library.isbn_13,
							item.created,
						],
					})) || [];

					setTable({
						body: body,
						head: head()
					});
				}
			} finally {
				setLoading(false);
			}
		}

		fetchData();
		return () => {
			isMounted = false;
		};
	}, []);

	const head = () => {
		const data: ITableHead[] = ["Id", "Libro", "ISBN", "Fecha creación"].map(item => ({ value: item }));
		return data;
	}

	return {
		loading,
		table,
		viewData
	}
}

export { useViewHook }
