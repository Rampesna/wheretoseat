import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { WorkDayModel } from '../../Models/Mongoose/Company/Workday/WorkDayModel';

export class UpdateWorkDaysRequest {
  @ApiProperty()
  @IsNotEmpty()
  companyId: string;

  @ApiProperty({
    type: [WorkDayModel],
  })
  @IsNotEmpty()
  workDays: WorkDayModel[];
}
