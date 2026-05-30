import 'package:timesheet/domain/entities/attendance.dart';
import 'package:timesheet/domain/entities/holiday_info.dart';

class Timesheet {
  const Timesheet({
    required this.year,
    required this.month,
    required this.attendances,
    required this.holidays,
  });

  final int year;
  final int month;
  final List<Attendance> attendances;
  final Map<int, HolidayInfo> holidays;
}
