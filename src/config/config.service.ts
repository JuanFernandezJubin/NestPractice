//We use this file to determine if we are in "development" or "production".

import * as fs from 'fs';
import { parse } from 'dotenv';
export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor() {
        const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

        if (isDevelopmentEnv) {
            //Validating that the .env file exists
            const envFilePath = __dirname + '/../../.env';
            const existPath = fs.existsSync(envFilePath);

            if (!existPath) {
                console.log('.env file does not exist');
                process.exit(0);
            }

            const envFile = fs.readFileSync(envFilePath);
            this.envConfig = parse(envFile);

        } else {
            this.envConfig = {
                PORT: process.env.PORT,
            };
        }
    }

    //Returns the value of a specific key
    get(key: string): string {
        return this.envConfig[key];
    }
}