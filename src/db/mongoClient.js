
import mongoose from 'mongoose';
import 'dotenv/config'
import logger from '../helpers/logger.js'

class MyMongoClient {
    constructor() {
        this.connected = false
        this.client = mongoose
    }

    async connect() {
        try {
            if(this.connected == false){
                await this.client.connect(process.env.MONGO_URI_STORE_SESSIONS, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                })
                this.connected = true
                logger.info('database is connected')
            }
        } catch (error) {
            logger.error(error)
            process.exit(1)
        }
    }

    async disconnect() {
        try {
            await this.client.connection.close()
            logger.info('base de datos desconectada')
            this.connected = false
        } catch (error) {
            logger.error(error)
            process.exit(1)
        }
    }
}

export default MyMongoClient