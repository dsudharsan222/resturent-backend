import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';
import { Testimonial } from './entities/testimonial.entity';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly settingRepository: Repository<Setting>,
    @InjectRepository(Testimonial)
    private readonly testimonialRepository: Repository<Testimonial>,
  ) {}

  async getSettings() {
    let setting = await this.settingRepository.findOne({ where: { id: 1 } });
    if (!setting) {
      setting = this.settingRepository.create({ id: 1, name: 'Default Restaurant' });
      await this.settingRepository.save(setting);
    }
    return setting;
  }

  async getApprovedTestimonials() {
    return this.testimonialRepository.find({
      where: { is_approved: true },
      order: { date: 'DESC' },
    });
  }

  async createTestimonial(createTestimonialDto: CreateTestimonialDto) {
    const testimonial = this.testimonialRepository.create({
      ...createTestimonialDto,
      is_approved: false,
    });
    
    await this.testimonialRepository.save(testimonial);
    return {
      success: true,
      message: 'Thank you for your review. It will be published once approved by our team.',
    };
  }

  // --- Admin Methods ---

  async updateSettings(updateSettingDto: any) {
    let setting = await this.settingRepository.findOne({ where: { id: 1 } });
    if (!setting) {
      const newSetting = this.settingRepository.create({ id: 1, ...updateSettingDto } as import('typeorm').DeepPartial<Setting>);
      return this.settingRepository.save(newSetting);
    }
    Object.assign(setting, updateSettingDto);
    return this.settingRepository.save(setting);
  }

  async getAllTestimonials() {
    return this.testimonialRepository.find({
      order: { date: 'DESC' },
    });
  }

  async approveTestimonial(id: number) {
    const testimonial = await this.testimonialRepository.findOne({ where: { id } });
    if (!testimonial) {
      throw new Error('Testimonial not found');
    }
    testimonial.is_approved = !testimonial.is_approved;
    await this.testimonialRepository.save(testimonial);
    return { 
      settings: { 
        success: 1, 
        message: testimonial.is_approved ? 'Testimonial approved and published' : 'Testimonial hidden' 
      },
      data: testimonial
    };
  }

  async deleteTestimonial(id: number) {
    await this.testimonialRepository.delete(id);
    return { success: true, message: 'Testimonial deleted' };
  }
}
