import { NestFactory } from "@nestjs/core"
import { AppModule } from "./infrastructure/api/modules/app.module.js"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            forbidUnknownValues: true,
        }),
    )
    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
