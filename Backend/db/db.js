const mongoose = require('mongoose');
//allow us to write cleaner, more readable code when handling asynchronous operations 
//such as API calls, timeouts, and promises.
const db = async () =>{
    try{
        mongoose.set('strictQuery' , false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB connected')

    } catch(error){
        console.log('Db is not connected');
    }
}

module.exports={db}