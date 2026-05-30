class TimesheetTableHeaderSpec {
  const TimesheetTableHeaderSpec({
    this.dayLabel = 'Dia',
    this.enterTimeLabel = 'Hora de\nentrada',
    this.exitTimeLabel = 'Hora de\nsaída',
    this.signatureLabel = 'Assinatura',
    this.additionalInfoLabel = 'Observação',
  });

  final String dayLabel;
  final String enterTimeLabel;
  final String exitTimeLabel;
  final String signatureLabel;
  final String additionalInfoLabel;
}
