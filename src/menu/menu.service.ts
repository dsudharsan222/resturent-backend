import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { MenuItem } from './entities/menu-item.entity';
import { GetMenuFilterDto } from './dto/get-menu-filter.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
  ) {}

  async findAllCategories() {
    return this.categoryRepository.find();
  }

  async findAllMenuItems(filterDto: GetMenuFilterDto) {
    const query = this.menuItemRepository.createQueryBuilder('menu_item')
      .leftJoinAndSelect('menu_item.category', 'category');

    if (filterDto.category) {
      // Allow filtering by category ID or name depending on frontend needs
      // Here we filter by category ID or name based on a string match or ID cast
      query.andWhere(
        '(category.id = :categoryId OR category.name = :categoryName)',
        { categoryId: filterDto.category, categoryName: filterDto.category }
      );
    }

    if (filterDto.isFeatured === 'true') {
      query.andWhere('menu_item.is_featured = :isFeatured', { isFeatured: true });
    } else if (filterDto.isFeatured === 'false') {
      query.andWhere('menu_item.is_featured = :isFeatured', { isFeatured: false });
    }

    return query.getMany();
  }

  // --- Admin Methods ---

  async createCategory(createCategoryDto: any) {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async updateCategory(id: number, updateCategoryDto: any) {
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.categoryRepository.findOne({ where: { id } });
  }

  async deleteCategory(id: number) {
    await this.categoryRepository.delete(id);
    return { success: true, message: 'Category deleted' };
  }

  async createMenuItem(createMenuItemDto: any) {
    const menuItem = this.menuItemRepository.create(createMenuItemDto);
    return this.menuItemRepository.save(menuItem);
  }

  async updateMenuItem(id: string, updateMenuItemDto: any) {
    await this.menuItemRepository.update(id, updateMenuItemDto);
    return this.menuItemRepository.findOne({ where: { id } });
  }

  async deleteMenuItem(id: string) {
    await this.menuItemRepository.delete(id);
    return { success: true, message: 'Menu item deleted' };
  }
}
