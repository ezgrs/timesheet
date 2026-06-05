#!/usr/bin/env node

import { execSync } from "child_process"
import { Command } from "commander"

type Token =
    | { type: "command"; value: string }
    | { type: "migration"; name: string }

type Args = {
    tokens: Token[]
    useDataSource: boolean
}

function exec({ tokens, useDataSource }: Args): void {
    const args = [
        "node",
        "--experimental-specifier-resolution=node",
        "--loader ./scripts/loader.mjs",
        "./node_modules/typeorm/cli.js",
    ]
    if (useDataSource) {
        args.push("-d ./src/infrastructure/db/data-source.ts")
    }
    for (const token of tokens) {
        switch (token.type) {
            case "command":
                args.push(`migration:${token.value}`)
                break
            case "migration":
                args.push(`./src/infrastructure/db/migrations/${token.name}`)
                break
        }
    }
    execSync(args.join(" "), { stdio: "inherit" })
}

function create(): Command {
    const program = new Command()

    program
        .command("new")
        .argument("<name>")
        .option("--empty", "", false)
        .action((name, options) => {
            const empty: boolean = options.empty
            exec({
                tokens: [
                    { type: "command", value: empty ? "create" : "generate" },
                    { type: "migration", name: name },
                ],
                useDataSource: !empty,
            })
        })

    program.command("up").action(() => {
        exec({
            tokens: [{ type: "command", value: "run" }],
            useDataSource: true,
        })
    })

    program.command("down").action(() => {
        exec({
            tokens: [{ type: "command", value: "revert" }],
            useDataSource: true,
        })
    })

    return program
}

async function main(): Promise<void> {
    const command = create()
    await command.parseAsync()
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
