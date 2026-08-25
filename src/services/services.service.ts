import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { ServiceBenefit } from './entities/service-benefit.entity';
import { ServiceMenuOption } from './entities/service-menu-option.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(ServiceBenefit)
    private readonly benefitRepository: Repository<ServiceBenefit>,
    @InjectRepository(ServiceMenuOption)
    private readonly menuOptionRepository: Repository<ServiceMenuOption>,
  ) {}

  async findAll() {
    return this.serviceRepository.find({
      relations: { benefits: true, menu_options: true },
    });
  }

  async findOne(id: string) {
    const service = await this.serviceRepository.findOne({
      where: { id },
      relations: { benefits: true, menu_options: true },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return service;
  }

  // --- Admin Methods ---

  async create(createServiceDto: any) {
    const { benefits, menu_options, ...serviceData } = createServiceDto;
    
    const service = this.serviceRepository.create(serviceData as Partial<Service>);
    await this.serviceRepository.save(service);

    if (benefits && benefits.length > 0) {
      const benefitEntities = benefits.map((b: string) => this.benefitRepository.create({ package_id: service.id, benefit: b }));
      await this.benefitRepository.save(benefitEntities);
    }

    if (menu_options && menu_options.length > 0) {
      const optionEntities = menu_options.map((o: string) => this.menuOptionRepository.create({ package_id: service.id, menu_option: o }));
      await this.menuOptionRepository.save(optionEntities);
    }

    return this.findOne(service.id);
  }

  async update(id: string, updateServiceDto: any) {
    const { benefits, menu_options, ...serviceData } = updateServiceDto;

    await this.serviceRepository.update(id, serviceData);

    if (benefits !== undefined) {
      await this.benefitRepository.delete({ package_id: id });
      if (benefits.length > 0) {
        const benefitEntities = benefits.map((b: string) => this.benefitRepository.create({ package_id: id, benefit: b }));
        await this.benefitRepository.save(benefitEntities);
      }
    }

    if (menu_options !== undefined) {
      await this.menuOptionRepository.delete({ package_id: id });
      if (menu_options.length > 0) {
        const optionEntities = menu_options.map((o: string) => this.menuOptionRepository.create({ package_id: id, menu_option: o }));
        await this.menuOptionRepository.save(optionEntities);
      }
    }

    return this.findOne(id);
  }

  async updateBasicInfo(id: string, basicInfo: any) {
    if (Object.keys(basicInfo).length > 0) {
      await this.serviceRepository.update(id, basicInfo);
    }
    return this.findOne(id);
  }

  async updateBenefits(id: string, benefits: string[]) {
    await this.benefitRepository.delete({ package_id: id });
    if (benefits && benefits.length > 0) {
      const benefitEntities = benefits.map((b: string) => this.benefitRepository.create({ package_id: id, benefit: b }));
      await this.benefitRepository.save(benefitEntities);
    }
    return this.findOne(id);
  }

  async updateMenuOptions(id: string, menuOptions: string[]) {
    await this.menuOptionRepository.delete({ package_id: id });
    if (menuOptions && menuOptions.length > 0) {
      const optionEntities = menuOptions.map((o: string) => this.menuOptionRepository.create({ package_id: id, menu_option: o }));
      await this.menuOptionRepository.save(optionEntities);
    }
    return this.findOne(id);
  }

  async remove(id: string) {
    await this.serviceRepository.delete(id);
    return { success: true, message: 'Service deleted' };
  }
}
