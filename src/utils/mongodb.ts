import mongoose from "mongoose"

export async function connectMongo () {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection

        /* success message in console when connection is established */
        connection.on('connected', () => {
            console.log('Successfully connected to database!')
        })

        //for handling connection errors when connecting to db
        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running.' + err)
            process.exit()
        })
    } catch(err) {
        console.log(err)
    }
}