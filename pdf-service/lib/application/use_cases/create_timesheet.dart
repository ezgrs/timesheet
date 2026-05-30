import 'dart:typed_data';

import 'package:dartx/dartx.dart';
import 'package:intl/date_symbol_data_local.dart';
import 'package:intl/intl.dart' as intl;
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;

import 'package:timesheet/domain/entities/holiday_info.dart';
import 'package:timesheet/domain/entities/timesheet.dart';
import 'package:timesheet/domain/enums/absence_type.dart';
import 'package:timesheet/domain/enums/holiday_shift.dart';
import 'package:timesheet/domain/enums/holiday_type.dart';
import 'package:timesheet/domain/specs/timesheet.dart';

Future<Uint8List> createTimesheet({
  required Timesheet timesheet,
  required TimesheetSpec spec,
  Uint8List? headerBytes,
}) async {
  final date = DateTime(timesheet.year, timesheet.month);

  await initializeDateFormatting(spec.locale);

  final pdf = pw.Document();
  for (final attendance in timesheet.attendances) {
    pdf.addPage(
      pw.Page(
        pageFormat: PdfPageFormat.a4,
        margin: pw.EdgeInsets.zero,
        build: (context) {
          return pw.Column(
            children: [
              if (headerBytes != null)
                pw.ClipRect(
                  child: pw.Image(
                    pw.MemoryImage(headerBytes.buffer.asUint8List()),
                    height: 2.5 * PdfPageFormat.cm,
                    alignment: pw.Alignment.topCenter,
                  ),
                )
              else
                pw.SizedBox(height: 1 * PdfPageFormat.cm),
              pw.Column(
                children: [
                  pw.Text(spec.title),
                  pw.SizedBox(height: 5),
                  pw.Text(spec.subtitle),
                  pw.SizedBox(height: 5),
                  pw.Text(
                    intl.DateFormat(
                      'MMMM/yyyy',
                      spec.locale,
                    ).format(date).toUpperCase(),
                  ),
                ],
              ),
              pw.Padding(
                padding: const pw.EdgeInsets.symmetric(
                  vertical: 10,
                  horizontal: 50,
                ),
                child: pw.Column(
                  crossAxisAlignment: pw.CrossAxisAlignment.stretch,
                  children: [
                    pw.RichText(
                      text: pw.TextSpan(
                        children: [
                          pw.TextSpan(text: '${spec.headerSpec.nameLabel}: '),
                          pw.TextSpan(
                            text: attendance.employee.name.toUpperCase(),
                            style: pw.TextStyle(fontWeight: pw.FontWeight.bold),
                          ),
                        ],
                      ),
                    ),
                    pw.Row(
                      mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
                      children: [
                        pw.RichText(
                          text: pw.TextSpan(
                            children: [
                              pw.TextSpan(
                                text: '${spec.headerSpec.roleLabel}: ',
                              ),
                              pw.TextSpan(
                                text: attendance.employee.role,
                                style: pw.TextStyle(
                                  fontWeight: pw.FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                        ),
                        pw.RichText(
                          text: pw.TextSpan(
                            children: [
                              pw.TextSpan(
                                text: '${spec.headerSpec.codeLabel}: ',
                              ),
                              pw.TextSpan(
                                text: attendance.employee.code,
                                style: pw.TextStyle(
                                  fontWeight: pw.FontWeight.bold,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              pw.Padding(
                padding: const pw.EdgeInsets.symmetric(horizontal: 20),
                child: pw.Table(
                  border: pw.TableBorder.all(),
                  defaultVerticalAlignment:
                      pw.TableCellVerticalAlignment.middle,
                  children:
                      List.generate(date.daysInMonth, (i) {
                            final day = i + 1;
                            final dt = date.copyWith(day: day).toUtc().date;
                            final info = timesheet.holidays[day];
                            final texts = <HolidayShift, String?>{
                              for (final HolidayShift shift
                                  in HolidayShift.values)
                                shift: switch (dt.weekday) {
                                  DateTime.saturday =>
                                    spec.tableBodySpec.saturdayLabel,
                                  DateTime.sunday =>
                                    spec.tableBodySpec.sundayLabel,
                                  _ => switch (info) {
                                    HolidayInfo()
                                        when info.shifts.contains(shift) =>
                                      switch (info.type) {
                                        HolidayType.required =>
                                          spec
                                              .tableBodySpec
                                              .requiredHolidayLabel,
                                        HolidayType.optional =>
                                          spec
                                              .tableBodySpec
                                              .optionalHolidayLabel,
                                      },
                                    _ => switch (attendance.absences[day]) {
                                      null || AbsenceType.unjustified => null,
                                      AbsenceType.annualLeave =>
                                        spec.tableBodySpec.annualLeaveLabel,
                                      AbsenceType.sickLeave =>
                                        spec.tableBodySpec.sickLeaveLabel,
                                      AbsenceType.medicalLeave =>
                                        spec.tableBodySpec.medicalLeaveLabel,
                                      AbsenceType.longServiceLeave =>
                                        spec
                                            .tableBodySpec
                                            .longServiceLeaveLabel,
                                    },
                                  },
                                },
                            };
                            return pw.TableRow(
                              children: [
                                pw.Center(
                                  child: pw.Padding(
                                    padding: const pw.EdgeInsets.symmetric(
                                      vertical: 1,
                                    ),
                                    child: pw.Text('$day'),
                                  ),
                                ),
                                for (int i = 0; i < 7; i++)
                                  pw.Center(
                                    child: pw.Text(switch (i) {
                                      // Primeiro horário
                                      0 || 2 =>
                                        texts[HolidayShift.morning] == null
                                            ? ':'
                                            : ' ',
                                      1 => texts[HolidayShift.morning] ?? ' ',
                                      // Segundo horário
                                      3 || 5 =>
                                        texts[HolidayShift.afternoon] == null
                                            ? ':'
                                            : ' ',
                                      4 => texts[HolidayShift.afternoon] ?? ' ',
                                      // Outros campos
                                      _ => ' ',
                                    }),
                                  ),
                              ],
                            );
                          })
                          .prependElement(
                            pw.TableRow(
                              children: [
                                pw.Expanded(
                                  child: pw.Center(
                                    child: pw.Text(
                                      spec.tableHeaderSpec.dayLabel,
                                      style: pw.TextStyle(
                                        fontWeight: pw.FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ),
                                pw.Expanded(
                                  flex: 2,
                                  child: pw.Center(
                                    child: pw.Text(
                                      spec.tableHeaderSpec.enterTimeLabel,
                                      style: pw.TextStyle(
                                        fontWeight: pw.FontWeight.bold,
                                        fontSize: 8,
                                      ),
                                      textAlign: pw.TextAlign.center,
                                    ),
                                  ),
                                ),
                                pw.Expanded(
                                  flex: 5,
                                  child: pw.Center(
                                    child: pw.Text(
                                      spec.tableHeaderSpec.signatureLabel,
                                      style: pw.TextStyle(
                                        fontWeight: pw.FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ),
                                pw.Expanded(
                                  flex: 2,
                                  child: pw.Center(
                                    child: pw.Text(
                                      spec.tableHeaderSpec.exitTimeLabel,
                                      style: pw.TextStyle(
                                        fontWeight: pw.FontWeight.bold,
                                        fontSize: 8,
                                      ),
                                      textAlign: pw.TextAlign.center,
                                    ),
                                  ),
                                ),
                                pw.Expanded(
                                  flex: 2,
                                  child: pw.Center(
                                    child: pw.Text(
                                      spec.tableHeaderSpec.enterTimeLabel,
                                      style: pw.TextStyle(
                                        fontWeight: pw.FontWeight.bold,
                                        fontSize: 8,
                                      ),
                                      textAlign: pw.TextAlign.center,
                                    ),
                                  ),
                                ),
                                pw.Expanded(
                                  flex: 5,
                                  child: pw.Center(
                                    child: pw.Text(
                                      spec.tableHeaderSpec.signatureLabel,
                                      style: pw.TextStyle(
                                        fontWeight: pw.FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ),
                                pw.Expanded(
                                  flex: 2,
                                  child: pw.Center(
                                    child: pw.Text(
                                      spec.tableHeaderSpec.exitTimeLabel,
                                      style: pw.TextStyle(
                                        fontWeight: pw.FontWeight.bold,
                                        fontSize: 8,
                                      ),
                                      textAlign: pw.TextAlign.center,
                                    ),
                                  ),
                                ),
                                pw.Expanded(
                                  flex: 5,
                                  child: pw.Center(
                                    child: pw.Text(
                                      '${spec.tableHeaderSpec.additionalInfoLabel}:',
                                      style: pw.TextStyle(
                                        fontWeight: pw.FontWeight.bold,
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          )
                          .toList(),
                ),
              ),
              pw.SizedBox(height: 0.8 * PdfPageFormat.cm),
              pw.Padding(
                padding: const pw.EdgeInsets.symmetric(
                  horizontal: PdfPageFormat.cm,
                ),
                child: pw.Column(
                  mainAxisSize: pw.MainAxisSize.min,
                  children:
                      List.generate(3, (i) {
                            return pw.Row(
                              children: [
                                if (i == 0)
                                  pw.Row(
                                    mainAxisSize: pw.MainAxisSize.min,
                                    children: [
                                      pw.Text(
                                        spec.footerSpec.additionalInfoLabel,
                                      ),
                                      pw.SizedBox(width: .2 * PdfPageFormat.cm),
                                    ],
                                  ),
                                pw.Expanded(
                                  child: pw.DecoratedBox(
                                    child: pw.SizedBox(
                                      height: .3 * PdfPageFormat.cm,
                                    ),
                                    decoration: const pw.BoxDecoration(
                                      border: pw.Border(
                                        bottom: pw.BorderSide(),
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            );
                          })
                          .expand(
                            (child) => [
                              pw.SizedBox(height: .4 * PdfPageFormat.cm),
                              child,
                            ],
                          )
                          .skip(1)
                          .toList(),
                ),
              ),
              pw.SizedBox(height: 0.8 * PdfPageFormat.cm),
              pw.Row(
                children:
                    [
                      spec.footerSpec.managerSignatureLabel,
                      spec.footerSpec.employeeSignatureLabel,
                    ].map((label) {
                      return pw.Expanded(
                        child: pw.Center(
                          child: pw.Padding(
                            padding: const pw.EdgeInsets.symmetric(
                              horizontal: PdfPageFormat.cm,
                            ),
                            child: pw.Column(
                              mainAxisSize: pw.MainAxisSize.min,
                              children: [
                                pw.SizedBox(height: 0.3 * PdfPageFormat.cm),
                                pw.Divider(),
                                pw.SizedBox(width: 5),
                                pw.Text(label),
                              ],
                            ),
                          ),
                        ),
                      );
                    }).toList(),
              ),
            ],
          );
        },
      ),
    );
  }
  return pdf.save();
}
