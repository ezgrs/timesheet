class TimesheetTableBodySpec {
  const TimesheetTableBodySpec({
    this.saturdayLabel = 'Sábado',
    this.sundayLabel = 'Domingo',
    this.requiredHolidayLabel = 'FERIADO',
    this.optionalHolidayLabel = 'FACULTADO',
    this.annualLeaveLabel = 'FÉRIAS',
    this.sickLeaveLabel = 'ATESTADO',
    this.medicalLeaveLabel = 'L. MÉDICA',
    this.longServiceLeaveLabel = 'L. PRÊMIO',
  });

  final String saturdayLabel;
  final String sundayLabel;
  final String requiredHolidayLabel;
  final String optionalHolidayLabel;
  final String annualLeaveLabel;
  final String sickLeaveLabel;
  final String medicalLeaveLabel;
  final String longServiceLeaveLabel;
}
