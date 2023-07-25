import axios from "axios";
import { environment } from "@/environments";
import { IUser } from "../entities";
import { urlBuilder } from "../utils";

export const me = async() => {
    let url: string = urlBuilder.services(environment.api.services.user, {
        version: 'v1'
    });

    url = `${url}`;

    return await axios.get<IUser>(url);
}
