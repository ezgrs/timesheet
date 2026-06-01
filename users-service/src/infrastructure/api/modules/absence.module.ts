import { Module } from "@nestjs/common"
import { AbsenceController } from "../controllers/absence.controller.js"
import { TypeORMAbsenceRepository } from "../services/typeorm-absence.repository.js"
import { AbsenceEntity } from "@/infrastructure/db/entities/absence.entity.js"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
    imports: [TypeOrmModule.forFeature([AbsenceEntity])],
    controllers: [AbsenceController],
    providers: [TypeORMAbsenceRepository],
})
export class AbsenceModule {}
