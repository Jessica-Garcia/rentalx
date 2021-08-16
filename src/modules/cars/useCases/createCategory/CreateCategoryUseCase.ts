import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const nameAlreadExists = await this.categoriesRepository.findByName(name);

    if (nameAlreadExists) {
      throw new Error('Category already resgistered');
    }
    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
