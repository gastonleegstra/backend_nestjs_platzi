import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735657406866 implements MigrationInterface {
    name = 'Migration1735657406866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(255) NOT NULL, "lastName" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "createAt" TIMESTAMP NOT NULL, "updateAt" TIMESTAMP NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" text NOT NULL, "price" double precision NOT NULL, "stock" integer NOT NULL, "image" character varying, "createAt" TIMESTAMP NOT NULL, "updateAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "address" text, "createAt" TIMESTAMP NOT NULL, "updateAt" TIMESTAMP NOT NULL, "userId" integer, CONSTRAINT "REL_3f62b42ed23958b120c235f74d" UNIQUE ("userId"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "status" character varying(255) NOT NULL, "total" double precision NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "customerId" integer, CONSTRAINT "REL_124456e637cca7a415897dce65" UNIQUE ("customerId"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_products_product" ("orderId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_59f5d41216418eba313ed3c7d7c" PRIMARY KEY ("orderId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1f9ea0b0e59e0d98ade4f2d5e9" ON "order_products_product" ("orderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d6c66c08b9c7e84a1b657797df" ON "order_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_3f62b42ed23958b120c235f74df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_products_product" ADD CONSTRAINT "FK_1f9ea0b0e59e0d98ade4f2d5e99" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_products_product" ADD CONSTRAINT "FK_d6c66c08b9c7e84a1b657797dff" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_products_product" DROP CONSTRAINT "FK_d6c66c08b9c7e84a1b657797dff"`);
        await queryRunner.query(`ALTER TABLE "order_products_product" DROP CONSTRAINT "FK_1f9ea0b0e59e0d98ade4f2d5e99"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_3f62b42ed23958b120c235f74df"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d6c66c08b9c7e84a1b657797df"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1f9ea0b0e59e0d98ade4f2d5e9"`);
        await queryRunner.query(`DROP TABLE "order_products_product"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
