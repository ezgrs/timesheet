import { Component, signal } from "@angular/core"
import { EmployeeFormComponent } from "../employee-form/component"
import { Employee } from "../domain/entities/employee"
import { EmployeeCardComponent } from "../employee-card/component"
import { NgFor } from "@angular/common"

@Component({
    selector: "app-home",
    imports: [EmployeeFormComponent, EmployeeCardComponent],
    templateUrl: "./component.html",
})
export class HomeComponent {
    currentMonth = "June 2026"
    employees = signal<Employee[]>([])

    addEmployee(employee: Employee) {
        this.employees.update((employees) => [...employees, employee])
    }

    removeEmployee(code: string) {
        this.employees.update((employees) =>
            employees.filter((employee) => employee.code !== code),
        )
    }
}
