import 'package:dart_frog/dart_frog.dart';
import 'package:timesheet/application/use_cases/create_timesheet.dart';
import 'package:timesheet/domain/entities/attendance.dart';
import 'package:timesheet/domain/entities/employee.dart';
import 'package:timesheet/domain/entities/holiday_info.dart';
import 'package:timesheet/domain/entities/timesheet.dart';
import 'package:timesheet/domain/specs/timesheet.dart';
import 'package:timesheet/domain/specs/timesheet_footer.dart';
import 'package:timesheet/domain/specs/timesheet_header.dart';
import 'package:timesheet/domain/specs/timesheet_table_body.dart';
import 'package:timesheet/domain/specs/timesheet_table_header.dart';
import 'package:timesheet/infrastructure/dto/models.dart';
import 'package:timesheet/presentation/i18n/timesheet.i18n.dart' as i18n;
import 'package:universal_io/io.dart';

Future<Response> onRequest(RequestContext context) async {
  final body = await context.request.json();
  final TimesheetDto timesheetDto;
  try {
    timesheetDto = TimesheetDto.fromJson(body as Map);
  } catch (e) {
    return Response(statusCode: HttpStatus.badRequest);
  }
  final timesheet = Timesheet(
    year: timesheetDto.year,
    month: timesheetDto.month,
    attendances: timesheetDto.attendances.map((attendance) {
      return Attendance(
        employee: Employee(
          name: attendance.employee.name,
          role: attendance.employee.role,
          code: attendance.employee.code,
        ),
        absences: attendance.absences,
      );
    }).toList(),
    holidays: timesheetDto.holidays.map((day, info) {
      return MapEntry(day, HolidayInfo(type: info.type, shifts: info.shifts));
    }),
  );

  final i18n.Timesheet t;
  final locale = context.request.params['locale'] ?? 'pt_BR';
  switch (locale) {
    case 'pt_BR':
      t = const i18n.Timesheet();
    default:
      return Response(
        statusCode: HttpStatus.badRequest,
        body: 'unsupported locale: $locale',
      );
  }

  final spec = TimesheetSpec(
    title: timesheetDto.title,
    headerSpec: TimesheetHeaderSpec(
      nameLabel: t.header.name,
      roleLabel: t.header.role,
      codeLabel: t.header.code,
    ),
    tableHeaderSpec: TimesheetTableHeaderSpec(
      dayLabel: t.table.header.day,
      enterTimeLabel: t.table.header.enterTime,
      exitTimeLabel: t.table.header.exitTime,
      signatureLabel: t.table.header.signature,
      additionalInfoLabel: t.table.header.additionalInfo,
    ),
    tableBodySpec: TimesheetTableBodySpec(
      saturdayLabel: t.table.body.saturday,
      sundayLabel: t.table.body.sunday,
      requiredHolidayLabel: t.table.body.requiredHoliday,
      optionalHolidayLabel: t.table.body.optionalHoliday,
      annualLeaveLabel: t.table.body.annualLeave,
      sickLeaveLabel: t.table.body.sickLeave,
      medicalLeaveLabel: t.table.body.medicalLeave,
      longServiceLeaveLabel: t.table.body.longServiceLeave,
    ),
    footerSpec: TimesheetFooterSpec(
      additionalInfoLabel: t.footer.additionalInfo,
      employeeSignatureLabel: t.footer.employeeSignature,
      managerSignatureLabel: t.footer.managerSignature,
    ),
    subtitle: t.subtitle,
    locale: locale,
  );
  final bytes = await createTimesheet(timesheet: timesheet, spec: spec);
  return Response.bytes(
    body: bytes,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=Frequencia.pdf',
    },
  );
}
