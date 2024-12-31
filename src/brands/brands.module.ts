import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BrandsService } from "./services/brands.service";
import { BrandsController } from "./controllers/brands.controller";
import { Brand } from "./entities/brand.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
