import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterUserIdColumn1631831294583 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users ADD PRIMARY KEY (id);');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE users DROP CONSTRAINT users_pkey;');
  }
}
