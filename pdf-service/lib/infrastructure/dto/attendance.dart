part of 'models.dart';

@Data()
abstract class _AttendanceDto {
  @ModelField(name: 'employee', referTo: _EmployeeDto)
  Object? get employee;

  @Field(name: 'absences')
  Map<int, AbsenceType> get absences;
}
