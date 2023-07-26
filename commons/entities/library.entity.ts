import { IUser } from ".";

export interface ILibrary {
	id: string;
	isbn_10?: string | null;
	isbn_13: string;
	created: Date;
	modified?: Date | null;
	subtitle?: string | null;
	title: string;
}


export interface IViewLibrary extends ILibrary {
	id: string;
	user: IUser
}
