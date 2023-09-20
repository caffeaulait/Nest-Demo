import { IsBoolean } from 'class-validator';

export class ApprovdeReportDTO {
  @IsBoolean()
  approved: boolean;
}
