import 'package:timesheet/domain/specs/timesheet_footer.dart';
import 'package:timesheet/domain/specs/timesheet_header.dart';
import 'package:timesheet/domain/specs/timesheet_table_body.dart';
import 'package:timesheet/domain/specs/timesheet_table_header.dart';

class TimesheetSpec {
  const TimesheetSpec({
    required this.footerSpec,
    required this.tableHeaderSpec,
    required this.tableBodySpec,
    required this.headerSpec,
    required this.title,
    required this.subtitle,
    required this.locale,
  });

  final String title;
  final String subtitle;
  final String locale;
  final TimesheetHeaderSpec headerSpec;
  final TimesheetTableHeaderSpec tableHeaderSpec;
  final TimesheetTableBodySpec tableBodySpec;
  final TimesheetFooterSpec footerSpec;
}
