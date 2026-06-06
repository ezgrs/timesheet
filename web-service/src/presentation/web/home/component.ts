import { AfterViewInit, Component, ViewChild } from "@angular/core"
import { EmployeeFormComponent } from "../employee-form/component"
import { EmployeeCardComponent } from "../employee-card/component"
import { MatCalendar, MatDatepickerModule } from "@angular/material/datepicker"
import { provideNativeDateAdapter } from "@angular/material/core"
import { Employee } from "../../../domain/entities/employee"
import { BehaviorSubject, Observable, startWith } from "rxjs"
import { Attendance } from "../../../domain/entities/attendance"
import { DataRepositoryService } from "../core/services/data-repository.service"
import { AsyncPipe } from "@angular/common"
import { ToastService } from "../core/services/toast.service"

type MonthOfTheYear = { year: number; month: number }

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
export class HomeComponent implements AfterViewInit {
    @ViewChild("calendar")
    calendar!: MatCalendar<Date>

    private currentMonthSubject: BehaviorSubject<MonthOfTheYear>
    currentMonth$: Observable<MonthOfTheYear>
    attendances$: Observable<Attendance[]>

    private getAttendances$(
        initialMonth: MonthOfTheYear,
        subscribe: boolean,
    ): Observable<Attendance[]> {
        const observable = this.dataRepository.readAttendances(
            initialMonth.year,
            initialMonth.month,
        )
        if (subscribe) {
            observable.subscribe({
                error: (e) => {
                    if (
                        e instanceof TypeError &&
                        e.message === "Failed to fetch"
                    ) {
                        this.toast.error(
                            "A connection error has ocurred while retrieving the employees.",
                        )
                    }
                },
            })
        }
        return observable
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
        this.currentMonth$ = this.currentMonthSubject.asObservable()
        this.attendances$ = this.getAttendances$(initialMonth, false)

        this.currentMonthSubject.subscribe((month) => {
            this.attendances$ = this.getAttendances$(month, true)
        })
    }

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
        this.currentMonthSubject.next(this.currentMonthSubject.value)
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
        this.currentMonthSubject.next(this.currentMonthSubject.value)
    }
}
