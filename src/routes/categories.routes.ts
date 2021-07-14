import { Router } from 'express';
import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;
  const nameAlreadExists = categoriesRepository.findByName(name);

  if (nameAlreadExists) {
    return response
      .status(400)
      .json({ message: 'Category already resgistered' });
  }
  categoriesRepository.create({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get('/', (_request, response) => {
  const all = categoriesRepository.list();
  return response.json(all);
});

export { categoriesRoutes };
