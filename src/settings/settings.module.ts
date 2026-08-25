import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { Testimonial } from './entities/testimonial.entity';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [TypeOrmModule.forFeature([Setting, Testimonial])],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
