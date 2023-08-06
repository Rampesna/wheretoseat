import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CompanyTypeModel } from '../../Models/Mongoose/Company/CompanyTypeModel';

export class RegisterRequest {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  typeId: string;

  @ApiProperty()
  @IsNotEmpty()
  taxNumber: string;

  @ApiProperty()
  taxOffice: string | null;

  @ApiProperty()
  phone: string | null;

  @ApiProperty()
  email: string | null;

  @ApiProperty()
  address: string | null;
}
