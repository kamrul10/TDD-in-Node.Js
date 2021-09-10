import chalk from "chalk";
import mongoose from "mongoose";
import logger from "../utils/logger"

export const startDb = () => {
    mongoose.connect(process.env.MONGO_URL);
    mongoose.connection.on("connected", () => {
        logger.info(chalk.underline(`APP MONGODB@${mongoose.version}: ${chalk.magenta(process.env.MONGO_URL)}`));
    });

    mongoose.connection.on("disconnected", () => {
        logger.info(`Mongoose disconnected to: ${chalk.red.bold(process.env.MONGO_URL)}`);
    });
}