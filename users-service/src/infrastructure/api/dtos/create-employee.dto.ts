import { IsString, Length, Matches } from "class-validator"

export class CreateEmployeeDTO {
    @IsString()
    @Length(1)
    name!: string

    @IsString()
    @Length(11, 11)
    @Matches(/^[0-9]{7}-[0-9]{3}$/)
    code!: string

    @IsString()
    @Length(1, 255)
    role!: string
}
