import { Module } from "@nestjs/common";
import { BrandsService } from "./services/brands.service";
import { BrandsController } from "./controllers/brands.controller";

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}
