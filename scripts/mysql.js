const { exec, pwd, sed, ShellString } = require("shelljs");
const { stripIndent } = require("common-tags");
const dependencies = ["sequelize", "express-mysql-session", "mysql2"];

console.log(`[scripts/mysql.js]: Current directory: ${pwd()}`);
console.log(`[scripts/mysql.js]: 📦 📦 📦 Installing packages...`);

exec(`npm install --save ${dependencies.join(" ")}`);
console.log(
  `[scripts/mysql.js]: ✅ ✅ ✅ ${dependencies.join(",")} have been installed.`
);

console.log(`[scripts/mysql.js]: ⏳ ⏳ ⏳ Configuring .env variables...`);

sed(
  "-i",
  "# DATABASE ENVS",
  stripIndent`
    DB_HOST=
    DB_PORT=
    DB_USER=
    DB_PASSWORD=
    DB_DATABASE=
  `,
  ".env"
);

console.log(
  `[scripts/mysql.js]: ✅ ✅ ✅ .env variables have been added, don't forget to set their values.`
);

console.log(`[scripts/mysql.js]: ⏳ ⏳ ⏳ Requiring express-mysql-session...`);

sed(
  "-i",
  "//= require session store",
  'const MySQLStore = require("express-mysql-session")(session);',
  "app.js"
);

sed(
  "-i",
  "//= configure store options",
  stripIndent`
    const options = {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    };
  `,
  "app.js"
);

sed(
  "-i",
  "//= create new session store",
  "const sessionStore = new MySQLStore(options);",
  "app.js"
);

console.log(
  `[scripts/mysql.js]: ✅ ✅ ✅ MySQL Session Store configuration is done!`
);
