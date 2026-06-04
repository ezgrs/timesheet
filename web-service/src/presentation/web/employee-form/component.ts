import { Component, EventEmitter, Output } from "@angular/core"
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from "@angular/forms"
import { Employee } from "../../../domain/entities/employee"

@Component({
    selector: "app-employee-form",
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: "./component.html",
})
export class EmployeeFormComponent {
    @Output() add = new EventEmitter<Employee>()

    form = new FormGroup({
        name: new FormControl("", {
            nonNullable: true,
            validators: [Validators.required],
        }),
        code: new FormControl("", {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.pattern(/^\d{7}-\d{3}$/),
            ],
        }),
        role: new FormControl("", {
            nonNullable: true,
            validators: [Validators.required],
        }),
    })

    submit() {
        if (this.form.invalid) return

        this.add.emit({ ...this.form.getRawValue(), id: crypto.randomUUID() })
        this.form.reset()
    }
}
