part of 'models.dart';

@Data()
abstract class _EmployeeDto {
  @Field(name: 'name')
  String get name;

  @Field(name: 'role')
  String get role;

  @Field(name: 'code')
  String get code;
}
