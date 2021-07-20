import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}
class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    const nameAlreadExists = this.categoriesRepository.findByName(name);

    if (nameAlreadExists) {
      throw new Error('Category already resgistered');
    }
    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
