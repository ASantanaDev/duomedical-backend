import { sequelize } from "./src/config/database.js"
import app from "./src/app.js"

async function main() {
  try {
    await sequelize.authenticate();
    //await sequelize.sync();
    var PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();