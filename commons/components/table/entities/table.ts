export interface ITable {
	head: ITableHead[];
	body: ITableBody[];
}

export interface ITableHead {
	value: string;
}

export interface ITableBody {
	value: any[];
}
