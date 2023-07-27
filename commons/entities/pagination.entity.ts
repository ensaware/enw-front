export interface IPagination {
	link: IPaginationLink;
	page: number;
	pages: number;
	size: number;
	total: number;
}

export interface IPaginationLink {
	first: string;
	last: string;
	next: string;
	self: string;
	prev: string;
}
