import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Service } from './service.entity';

@Entity('catering_package_benefits')
export class ServiceBenefit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  package_id: string;

  @Column({ length: 255 })
  benefit: string;

  @ManyToOne(() => Service, (service) => service.benefits, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'package_id' })
  service: Service;
}
