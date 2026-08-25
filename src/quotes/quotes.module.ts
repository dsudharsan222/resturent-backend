import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { Quote } from './entities/quote.entity';
import { MasterEventType, MasterGuestCount, MasterFoodPreference } from './entities/master.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Quote,
      MasterEventType,
      MasterGuestCount,
      MasterFoodPreference,
    ]),
  ],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
