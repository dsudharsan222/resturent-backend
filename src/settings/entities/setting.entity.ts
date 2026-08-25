import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('settings')
export class Setting {
  @PrimaryColumn({ default: 1 })
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255, nullable: true })
  tagline: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 50, nullable: true })
  phone_reservations: string;

  @Column({ length: 50, nullable: true })
  phone_catering: string;

  @Column({ length: 255, nullable: true })
  email: string;

  @Column({ length: 255, nullable: true })
  timings: string;

  // New fields requested by frontend
  @Column({ type: 'json', nullable: true })
  address: any;

  @Column({ type: 'json', nullable: true })
  social_media: any;

  @UpdateDateColumn()
  updated_at: Date;
}
