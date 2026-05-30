import 'package:timesheet/domain/entities/employee.dart';
import 'package:timesheet/domain/enums/absence_type.dart';

class Attendance {
  const Attendance({required this.employee, required this.absences});

  final Employee employee;
  final Map<int, AbsenceType> absences;
}
