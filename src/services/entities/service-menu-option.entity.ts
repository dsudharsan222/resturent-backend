import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Service } from './service.entity';

@Entity('catering_package_menu_options')
export class ServiceMenuOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  package_id: string;

  @Column({ length: 255 })
  menu_option: string;

  @ManyToOne(() => Service, (service) => service.menu_options, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'package_id' })
  service: Service;
}
