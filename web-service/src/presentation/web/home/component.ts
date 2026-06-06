import {
    AfterViewInit,
    Component,
    signal,
    ViewChild,
    WritableSignal,
} from "@angular/core"
import { EmployeeFormComponent } from "../employee-form/component"
import { EmployeeCardComponent } from "../employee-card/component"
import { MatCalendar, MatDatepickerModule } from "@angular/material/datepicker"
import { provideNativeDateAdapter } from "@angular/material/core"
import { Employee } from "../../../domain/entities/employee"
import { BehaviorSubject, Observable, startWith } from "rxjs"
import { Attendance } from "../../../domain/entities/attendance"
import { DataRepositoryService } from "../core/services/data-repository.service"
import { ToastService } from "../core/services/toast.service"
import { Snapshot } from "../core/snapshot"
import { isConnectionError } from "../core/errors"
import { MatButtonModule } from "@angular/material/button"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"

type MonthOfTheYear = { year: number; month: number }

@Component({
    selector: "app-home",
    providers: [provideNativeDateAdapter()],
    imports: [
        EmployeeFormComponent,
        EmployeeCardComponent,
        MatDatepickerModule,
        MatButtonModule,
        MatProgressSpinnerModule,
    ],
    templateUrl: "./component.html",
})
export class HomeComponent implements AfterViewInit {
    @ViewChild("calendar")
    calendar!: MatCalendar<Date>

    private currentMonthSubject: BehaviorSubject<MonthOfTheYear>
    readonly attendances$: WritableSignal<Snapshot<Attendance[]>> = signal({
        type: "waiting",
    })

    private pushAttendances(initialMonth: MonthOfTheYear): void {
        this.attendances$.set({ type: "waiting" })
        this.dataRepository
            .readAttendances(initialMonth.year, initialMonth.month)
            .then((attendances) => {
                this.attendances$.set({ type: "done", value: attendances })
            })
            .catch((e) => {
                this.attendances$.set({ type: "error", value: e })
            })
    }

    constructor(
        private readonly dataRepository: DataRepositoryService,
        private readonly toast: ToastService,
    ) {
        const now = new Date()

        const initialMonth: MonthOfTheYear = {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
        }
        this.currentMonthSubject = new BehaviorSubject<MonthOfTheYear>(
            initialMonth,
        )
        this.pushAttendances(initialMonth)
        this.currentMonthSubject.subscribe(this.pushAttendances)
    }

    readonly isConnectionError = isConnectionError

    ngAfterViewInit(): void {
        this.calendar.stateChanges.pipe(startWith(null)).subscribe(() => {
            const date = this.calendar.activeDate
            const currentMonth = this.currentMonthSubject.value
            const updatedMonth: MonthOfTheYear = {
                month: date.getMonth() + 1,
                year: date.getFullYear(),
            }
            if (
                updatedMonth.month !== currentMonth.month ||
                updatedMonth.year !== currentMonth.year
            ) {
                this.currentMonthSubject.next(updatedMonth)
            }
        })
    }

    retry() {
        this.pushAttendances(this.currentMonthSubject.value)
    }

    async addEmployee(employee: Employee) {
        try {
            await this.dataRepository.addEmployee(employee)
        } catch (e) {
            if (e instanceof TypeError && e.message === "Failed to fetch") {
                this.toast.error(
                    "A connection error has ocurred while adding an employee.",
                )
            } else {
                this.toast.error("An unexpected error has ocurred.")
            }
            return
        }
        this.pushAttendances(this.currentMonthSubject.value)
    }

    async removeEmployee(id: string) {
        try {
            await this.dataRepository.removeEmployee(id)
        } catch (e) {
            if (e instanceof TypeError && e.message === "Failed to fetch") {
                this.toast.error(
                    "A connection error has ocurred while removing the employee.",
                )
            } else {
                this.toast.error("An unexpected error has ocurred.")
            }
            return
        }
        this.pushAttendances(this.currentMonthSubject.value)
    }
}
