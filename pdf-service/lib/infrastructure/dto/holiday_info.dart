part of 'models.dart';

@Data()
abstract class _HolidayInfoDto {
  @Field(name: 'type')
  HolidayType get type;

  @Field(name: 'shifts')
  Set<HolidayShift> get shifts;
}
