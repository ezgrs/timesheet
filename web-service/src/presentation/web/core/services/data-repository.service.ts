import { Inject, Injectable } from "@angular/core"
import { HTTPClient } from "../../../../application/ports/http-client"
import { APP_CONFIG, HTTP_CLIENT } from "../../config/tokens"
import { DataRepositoryUseCase } from "../../../../application/use-cases/data-repository"
import { from, Observable } from "rxjs"
import { Attendance } from "../../../../domain/entities/attendance"
import { AppConfig } from "../../config/config"
import { Employee } from "../../../../domain/entities/employee"

@Injectable({ providedIn: "root" })
export class DataRepositoryService {
    private readonly repository: DataRepositoryUseCase

    constructor(
        @Inject(HTTP_CLIENT) client: HTTPClient,
        @Inject(APP_CONFIG) config: AppConfig,
    ) {
        this.repository = new DataRepositoryUseCase(
            client,
            config.usersServiceURL,
        )
    }

    readAttendances(year: number, month: number): Observable<Attendance[]> {
        return from(this.repository.readAttendances(year, month))
    }

    async addEmployee(employee: Employee) {
        await this.repository.addEmployee(employee)
    }

    async removeEmployee(id: string) {
        await this.repository.removeEmployee(id)
    }
}
