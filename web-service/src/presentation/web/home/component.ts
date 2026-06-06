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

    constructor(private readonly dataRepository: DataRepositoryService) {
        const now = new Date()

        const initialMonth: MonthOfTheYear = {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
        }
        this.currentMonthSubject = new BehaviorSubject<MonthOfTheYear>(
            initialMonth,
        )
        this.currentMonth$ = this.currentMonthSubject.asObservable()
        this.attendances$ = this.dataRepository.readAttendances(
            initialMonth.year,
            initialMonth.month,
        )

        this.currentMonthSubject.subscribe((month) => {
            this.attendances$ = this.dataRepository.readAttendances(
                month.year,
                month.month,
            )
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
            console.error(e)
            return
        }
        this.currentMonthSubject.next(this.currentMonthSubject.value)
    }

    async removeEmployee(id: string) {
        try {
            await this.dataRepository.removeEmployee(id)
        } catch (e) {
            console.error(e)
            return
        }
        this.currentMonthSubject.next(this.currentMonthSubject.value)
    }
}
