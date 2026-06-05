import { execSync } from 'child_process';

const name = process.argv[2];

if (!name) {
  console.error('Please provide migration name');
  process.exit(1);
}

execSync(
  `node ` + 
  `--experimental-specifier-resolution=node ` + 
  `--loader ./scripts/loader.mjs ` + 
  `./node_modules/typeorm/cli.js ` + 
  `migration:generate ` + 
  `./src/infrastructure/db/migrations/${name} ` + 
  `-d ./src/infrastructure/db/data-source.ts`,
  { stdio: 'inherit' }
);