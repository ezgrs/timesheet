import { InjectionToken } from "@angular/core";
import { HTTPClient } from "../../../application/ports/http-client";
import { AppConfig } from "./config";

export const HTTP_CLIENT = new InjectionToken<HTTPClient>('HTTP_CLIENT')
export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG')