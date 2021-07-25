import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDaysNew1627198100174 implements MigrationInterface {
    name = 'AddDaysNew1627198100174'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" DROP COLUMN "tasks"`);
        await queryRunner.query(`ALTER TABLE "day" ADD "tasks" jsonb NOT NULL DEFAULT '[]'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "day" DROP COLUMN "tasks"`);
        await queryRunner.query(`ALTER TABLE "day" ADD "tasks" text array NOT NULL`);
    }

}
