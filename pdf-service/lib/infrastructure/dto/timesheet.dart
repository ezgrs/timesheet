part of 'models.dart';

@Data()
abstract class _TimesheetDto {
  @Field(name: 'title')
  String get title;

  @Field(name: 'year')
  int get year;

  @Field(name: 'month')
  int get month;

  @ModelField(
    name: 'attendances',
    referTo: _AttendanceDto,
    template: ModelFieldTemplate<List<ModelFieldType>>(),
  )
  Object? get attendances;

  @ModelField(
    name: 'holidays',
    referTo: _HolidayInfoDto,
    template: ModelFieldTemplate<Map<int, ModelFieldType>>(),
  )
  Object? get holidays;
}
