import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordToUsers1738958710299 implements MigrationInterface {
    name = 'AddPasswordToUsers1738958710299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
