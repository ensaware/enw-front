import { environment } from "@/environments";
import { urlBuilder } from "../utils";
import axios from "axios";
import { IViewLibrary } from "../entities/library.entity";

export const create = async(formData: FormData) => {
	let url: string = urlBuilder.services(environment.api.services.library, {
        version: 'v1'
    });

	url = `${url}/read/image`;

	return await axios.postForm<IViewLibrary>(url, formData);
}
