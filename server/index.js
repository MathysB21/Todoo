import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

async function initServer () {
    const app = express();
    app.use(cors());
    dotenv.config();
    const appolloServer = new ApolloServer({typeDefs, resolvers});
    await appolloServer.start();
    appolloServer.applyMiddleware({app});
    app.use((req, res) => {
        res.send("Server started successfully");
    });

    const PORT = process.env.PORT || 5000;
    try {
        await mongoose.connect(process.env.mongodb);
        console.log(`Connected to MongoDB at port ${PORT}`);
    } catch (error) {
        console.log(error);
    }

    app.listen(PORT, () => {
        console.log(`Express server is listening on port ${PORT}`)
    });
}

initServer();

// mongodb+srv://pietermbasson:admin#007@cluster0.nvv4kxi.mongodb.net/?retryWrites=true&w=majority
// mongodb+srv://pietermbasson:admin%23007@cluster0.nvv4kxi.mongodb.net/?retryWrites=true&w=majority