import { Component } from "@angular/core"
import { EmployeeFormComponent } from "../employee-form/component"
import { EmployeeCardComponent } from "../employee-card/component"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { provideNativeDateAdapter } from "@angular/material/core"
import { Employee } from "../../../domain/entities/employee"
import { Observable } from "rxjs"
import { Attendance } from "../../../domain/entities/attendance"
import { DataRepositoryService } from "../core/services/data-repository.service"
import { AsyncPipe } from "@angular/common"

@Component({
    selector: "app-home",
    providers: [provideNativeDateAdapter()],
    imports: [
        EmployeeFormComponent,
        EmployeeCardComponent,
        MatDatepickerModule,
        AsyncPipe,
    ],
    templateUrl: "./component.html",
})
export class HomeComponent {
    currentMonth = "June 2026"
    attendances$: Observable<Attendance[]>

    constructor(private readonly dataRepository: DataRepositoryService) {
        const now = new Date()
        this.attendances$ = this.dataRepository.readAttendances(
            now.getFullYear(),
            now.getMonth() + 1,
        )
    }

    addEmployee(employee: Employee) {}

    removeEmployee(id: string) {}
}
