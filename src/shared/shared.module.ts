import { Module } from "@nestjs/common";
import { KnexService } from "./database/knex.service";

@Module({
  imports: [],
  providers: [
    KnexService
  ],
  exports: [KnexService],
})
export class SharedModule {}