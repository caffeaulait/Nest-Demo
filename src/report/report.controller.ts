import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDTO } from './dto/create-report.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDTO } from './dto/report.dto';
import { ApprovdeReportDTO } from './dto/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDTO } from './dto/get-estimate.dto';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDTO)
  createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
    // console.log(`receiving body: ${body}`);
    return this.reportService.create(body, user);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approvdeReport(@Param('id') id: string, @Body() body: ApprovdeReportDTO) {
    return this.reportService.changeApproval(id, body.approved);
  }

  @Get()
  getEstimate(@Query() query: GetEstimateDTO) {
    return this.reportService.createEstimate(query);
  }
}
