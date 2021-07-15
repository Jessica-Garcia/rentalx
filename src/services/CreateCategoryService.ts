import { CategoriesRepository } from '../repositories/CategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}
class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const nameAlreadExists = this.categoriesRepository.findByName(name);

    if (nameAlreadExists) {
      throw new Error('Category already resgistered');
    }
    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
