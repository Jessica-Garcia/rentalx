import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      brand: 'Brand car',
      description: 'Description car',
      license_plate: 'ABC-1234',
      category_id: 'category',
      fine_amount: 60,
      daily_rate: 100,
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with exists license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car 1',
        brand: 'Brand car',
        description: 'Description car',
        license_plate: 'ABC-1234',
        category_id: 'category',
        fine_amount: 60,
        daily_rate: 100,
      });
      await createCarUseCase.execute({
        name: 'Car 2',
        brand: 'Brand car',
        description: 'Description car',
        license_plate: 'ABC-1234',
        category_id: 'category',
        fine_amount: 60,
        daily_rate: 100,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      brand: 'Brand car',
      description: 'Description car',
      license_plate: 'ABCD-1234',
      category_id: 'category',
      fine_amount: 60,
      daily_rate: 100,
    });

    expect(car.available).toBe(true);
  });
});
