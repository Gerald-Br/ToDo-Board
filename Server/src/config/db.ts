import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    db: {
        uri: process.env.DB_URI || '' //URI for a MongoDB Server
    }
};

export default config;