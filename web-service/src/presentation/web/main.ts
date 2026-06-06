import { bootstrapApplication } from "@angular/platform-browser"
import { App } from "./app/app"
import { APP_CONFIG, HTTP_CLIENT } from "./config/tokens"
import { HTTPClientService } from "./core/services/http-client.service"
import { routes } from "./app/app.routes"
import { provideRouter } from "@angular/router"
import { provideBrowserGlobalErrorListeners } from "@angular/core"
import { appConfig } from "./config/environments/development"
import { DataRepositoryService } from "./core/services/data-repository.service"
import {provideEnvironmentNgxMask} from "ngx-mask"

bootstrapApplication(App, {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        { provide: APP_CONFIG, useValue: appConfig },
        { provide: HTTP_CLIENT, useClass: HTTPClientService },
        DataRepositoryService,
        provideEnvironmentNgxMask(),
    ],
}).catch((err) => console.error(err))
