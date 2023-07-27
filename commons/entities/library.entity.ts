import { IUser } from ".";

export interface ILibrary {
	created: Date;
	id: string;
	isbn_10?: string | null;
	isbn_13: string;
	modified?: Date | null;
	subtitle?: string | null;
	title: string;
}


export interface IViewLibrary {
	created: Date;
	id: string;
	library: ILibrary
	user: IUser,
}
