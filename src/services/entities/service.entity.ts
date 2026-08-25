import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ServiceBenefit } from './service-benefit.entity';
import { ServiceMenuOption } from './service-menu-option.entity';

@Entity('catering_packages')
export class Service {
  @PrimaryColumn({ length: 50 })
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 100, nullable: true })
  capacity: string;

  @Column({ length: 512, nullable: true })
  image_url: string;

  @Column({ length: 255, nullable: true })
  path: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ServiceBenefit, (benefit) => benefit.service)
  benefits: ServiceBenefit[];

  @OneToMany(() => ServiceMenuOption, (menuOption) => menuOption.service)
  menu_options: ServiceMenuOption[];
}
