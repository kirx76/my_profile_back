import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDays1627197827834 implements MigrationInterface {
    name = 'AddDays1627197827834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "day" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "tasks" text array NOT NULL, CONSTRAINT "PK_42e726f6b72349f70b25598b50e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "day"`);
    }

}
