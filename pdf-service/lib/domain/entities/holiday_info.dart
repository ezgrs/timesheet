import 'package:timesheet/domain/enums/holiday_shift.dart';
import 'package:timesheet/domain/enums/holiday_type.dart';

class HolidayInfo {
  const HolidayInfo({
    required this.type,
    required this.shifts,
  });

  final HolidayType type;
  final Set<HolidayShift> shifts;
}
