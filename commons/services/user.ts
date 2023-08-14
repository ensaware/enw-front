import axios from "axios";
import { environment } from "@/environments";
import { IUser } from "../entities";
import { urlBuilder } from "../utils";

export const me = async() => {
    let url: string = urlBuilder.services(environment.api.services.user, {
        version: 'v1'
    });

    return await axios.get<IUser>(url);
}

export const updateCareer = async(career_id: string) => {
	let url: string = urlBuilder.services(environment.api.services.user, {
        version: 'v1'
    });

	return await axios.patch<IUser>(url, {
		career_id: career_id
	});
}
