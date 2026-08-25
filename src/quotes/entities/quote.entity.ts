import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MasterEventType, MasterGuestCount, MasterFoodPreference } from './master.entity';

@Entity('quotes')
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'event_type_id', length: 50, nullable: true })
  event_type_id: string;

  @Column({ name: 'guest_count_id', length: 50, nullable: true })
  guest_count_id: string;

  @Column({ name: 'food_preference_id', length: 50, nullable: true })
  food_preference_id: string;

  @ManyToOne(() => MasterEventType, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'event_type_id' })
  event_type: MasterEventType;

  @ManyToOne(() => MasterGuestCount, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'guest_count_id' })
  guest_count: MasterGuestCount;

  @ManyToOne(() => MasterFoodPreference, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'food_preference_id' })
  food_preference: MasterFoodPreference;

  @Column({ length: 255 })
  customer_name: string;

  @Column({ length: 50 })
  customer_phone: string;

  @Column({ length: 255 })
  customer_email: string;

  @Column()
  event_date: Date;

  @Column({ length: 50, default: 'Pending' })
  status: string;

  @Column({ type: 'json', nullable: true })
  selected_items: any;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
