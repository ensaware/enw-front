import { parseTemplate } from 'url-template'

import { environment } from "@/environments";

export const urlBuilder = {
    services(url: string, option = {}) {
        const serveUrl = getServicesUrl(url);
        return parseTemplate(serveUrl).expand(option)
    }
}

function getServicesUrl(url: string): string {
    return environment.api.base + url
}
