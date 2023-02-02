import { Module } from "@nestjs/common";
import { RulesGateway } from "./rules.gateway";
import { Rules } from "./rules.service";


@Module({
    providers : [RulesGateway,Rules]
})
export class RulesModule {}