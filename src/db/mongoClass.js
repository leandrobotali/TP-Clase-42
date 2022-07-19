import MyMongoClient from './mongoClient.js'

let instance = null;

class mongoClass {
    constructor() {
        this.client = new MyMongoClient()
        this.client.connect()
    }

    static getInstance(){
        if(!instance){
            instance = new mongoClass;
        }
        return instance
    }
}

export default mongoClass