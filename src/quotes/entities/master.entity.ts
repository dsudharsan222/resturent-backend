import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('master_event_types')
export class MasterEventType {
  @PrimaryColumn({ length: 50 })
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ default: true })
  is_active: boolean;
}

@Entity('master_guest_counts')
export class MasterGuestCount {
  @PrimaryColumn({ length: 50 })
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ default: true })
  is_active: boolean;
}

@Entity('master_food_preferences')
export class MasterFoodPreference {
  @PrimaryColumn({ length: 50 })
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ default: true })
  is_active: boolean;
}
