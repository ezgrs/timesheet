import { execSync } from 'child_process';

const name = process.argv[2];

if (!name) {
  console.error('Please provide migration name');
  process.exit(1);
}

execSync(
  `node ` + 
  `-r ts-node/register ` + 
  `-r tsconfig-paths/register ` + 
  `./node_modules/typeorm/cli.js ` + 
  `-d ./src/infrastructure/db/data-source.ts ` + 
  `migration:generate ` + 
  `./src/infrastructure/db/migrations/${name}`,
  { stdio: 'inherit' }
);