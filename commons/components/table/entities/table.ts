export interface ITable {
	head: ITableHead[];
	body: ITableBody[];
}

export interface ITableHead {
	id: string;
	value: string;
}

export interface ITableBody {
	id: string;
	value: any[];
}
