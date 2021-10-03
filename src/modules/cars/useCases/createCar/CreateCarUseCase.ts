import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

// @injectable()
class CreateCarUseCase {
  constructor(
    // @inject('CarsRespository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    name,
    brand,
    description,
    license_plate,
    category_id,
    fine_amount,
    daily_rate,
  }: ICreateCarDTO): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findBYLicensePlate(
      license_plate,
    );

    if (carAlreadyExists) {
      throw new AppError('Car already exists!');
    }

    const car = await this.carsRepository.create({
      name,
      brand,
      description,
      license_plate,
      category_id,
      fine_amount,
      daily_rate,
    });
    return car;
  }
}
export { CreateCarUseCase };
