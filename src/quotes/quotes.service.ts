import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './entities/quote.entity';
import { MasterEventType, MasterGuestCount, MasterFoodPreference } from './entities/master.entity';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteStatusDto } from './dto/update-quote-status.dto';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
    @InjectRepository(MasterEventType)
    private readonly eventTypeRepository: Repository<MasterEventType>,
    @InjectRepository(MasterGuestCount)
    private readonly guestCountRepository: Repository<MasterGuestCount>,
    @InjectRepository(MasterFoodPreference)
    private readonly foodPreferenceRepository: Repository<MasterFoodPreference>,
  ) {}

  async getConfig() {
    const [eventTypes, guestCounts, foodPreferences] = await Promise.all([
      this.eventTypeRepository.find({ where: { is_active: true } }),
      this.guestCountRepository.find({ where: { is_active: true } }),
      this.foodPreferenceRepository.find({ where: { is_active: true } }),
    ]);

    return {
      eventTypes,
      guestCounts,
      foodPreferences,
    };
  }

  async create(createQuoteDto: CreateQuoteDto) {
    const quote = this.quoteRepository.create({
      ...createQuoteDto,
      event_date: new Date(createQuoteDto.event_date),
    });
    
    const savedQuote = await this.quoteRepository.save(quote);
    
    return {
      success: true,
      message: 'Quote request submitted successfully. Our team will contact you shortly.',
      quote_id: savedQuote.id,
    };
  }

  async updateStatus(id: number, updateQuoteStatusDto: UpdateQuoteStatusDto) {
    const quote = await this.quoteRepository.findOne({ where: { id } });
    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }

    quote.status = updateQuoteStatusDto.status;
    await this.quoteRepository.save(quote);

    return {
      success: true,
      message: 'Status updated successfully.',
    };
  }

  // --- Admin Methods ---

  async findAll() {
    return this.quoteRepository.find({
      relations: { event_type: true, guest_count: true, food_preference: true },
      order: { created_at: 'DESC' },
    });
  }

  async createEventType(data: any) {
    const eventType = this.eventTypeRepository.create(data);
    return this.eventTypeRepository.save(eventType);
  }

  async deleteEventType(id: string) {
    await this.eventTypeRepository.delete(id);
    return { success: true };
  }

  async createGuestCount(data: any) {
    const guestCount = this.guestCountRepository.create(data);
    return this.guestCountRepository.save(guestCount);
  }

  async deleteGuestCount(id: string) {
    await this.guestCountRepository.delete(id);
    return { success: true };
  }

  async createFoodPreference(data: any) {
    const foodPref = this.foodPreferenceRepository.create(data);
    return this.foodPreferenceRepository.save(foodPref);
  }

  async deleteFoodPreference(id: string) {
    await this.foodPreferenceRepository.delete(id);
    return { success: true };
  }
}
