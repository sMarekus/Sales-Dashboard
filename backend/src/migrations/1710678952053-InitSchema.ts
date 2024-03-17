import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1710678952053 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "customer" (
                "id" SERIAL PRIMARY KEY,
                "firstName" VARCHAR(255),
                "lastName" VARCHAR(255),
                "email" VARCHAR(255) UNIQUE NOT NULL
            );
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "order" (
                "id" SERIAL PRIMARY KEY,
                "purchaseDate" TIMESTAMP NOT NULL,
                "country" VARCHAR(255),
                "device" VARCHAR(255),
                "customerId" INTEGER,
                CONSTRAINT "FK_customer" FOREIGN KEY ("customerId") REFERENCES "customer"("id")
            );
        `);

        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "order_item" (
                "id" SERIAL PRIMARY KEY,
                "EAN" VARCHAR(255),
                "quantity" INTEGER,
                "price" NUMERIC,
                "orderId" INTEGER,
                CONSTRAINT "FK_order" FOREIGN KEY ("orderId") REFERENCES "order"("id")
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order_item";`);
        await queryRunner.query(`DROP TABLE "order";`);
        await queryRunner.query(`DROP TABLE "customer";`);
    }

}
