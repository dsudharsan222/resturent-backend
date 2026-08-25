import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity('menu_items')
export class MenuItem {
  @PrimaryColumn({ length: 50 })
  id: string;

  @Column()
  category_id: number;

  @ManyToOne(() => Category, (category) => category.menuItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ length: 512, nullable: true })
  image_url: string;

  @Column({ type: 'enum', enum: ['veg', 'non-veg'] })
  type: 'veg' | 'non-veg';

  @Column({ default: false })
  is_featured: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
