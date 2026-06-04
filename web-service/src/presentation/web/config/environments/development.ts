import { AppConfig } from "../config";

export const appConfig: AppConfig = {
    pdfServiceURL: new URL('http://localhost:8081'),
    holidaysServiceURL: new URL('http://localhost:8082'),
    usersServiceURL: new URL('http://localhost:8083'),
}
