import { MongoClient } from "mongodb";

const url = "mongodb+srv://<seu_usuario>:<sua_senha>@<seu_cluster>.mongodb.net/agenda?retryWrites=true&w=majority"; 

const client = new MongoClient(url);

async function conectarDb() {
    try {
        await client.connect();

        return client.db('agenda'); 
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB Atlas:", error);
        throw error;
    }
}

export { conectarDb };