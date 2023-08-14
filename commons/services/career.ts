import axios from "axios";
import { environment } from "@/environments"
import { urlBuilder } from "../utils"
import { ICareer } from "../entities";

export const all = async() => {
	let url: string = urlBuilder.services(environment.api.services.career, {
		version: "v1"
	});

	url = `${url}/all`

	return await axios.get<ICareer[]>(url);
}
