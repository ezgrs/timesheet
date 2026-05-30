class TimesheetFooterSpec {
  const TimesheetFooterSpec({
    this.additionalInfoLabel = 'Observação:',
    this.employeeSignatureLabel = 'Assinatura do servidor',
    this.managerSignatureLabel = 'Assinatura do chefe imediato',
  });

  final String additionalInfoLabel;
  final String employeeSignatureLabel;
  final String managerSignatureLabel;
}
