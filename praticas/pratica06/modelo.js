import { conectarDb } from "./database.js";

class Tarefa {
    constructor(nome, concluida = false, id = null) {
       
        this.nome = nome;
        this.concluida = concluida;
        this.id = id; 

        
        this._db = null;
        this._collection = null;
    }

    
    async getDb() {
        if (!this._db) {
            this._db = await conectarDb();
        }
        return this._db;
    }

   
    async getCollection() {
        if (!this._collection) {
            const db = await this.getDb();
            this._collection = db.collection('tarefas');
        }
        return this._collection;
    }

    
    async inserir() {
        const collection = await this.getCollection();
        
        const resultado = await collection.insertOne({
            nome: this.nome,
            concluida: this.concluida
        });
        
        this.id = resultado.insertedId;
        return this.id;
    }

    
    async alterar() {
        const collection = await this.getCollection();
        
        await collection.updateOne({
            _id: this.id 
        }, {
            $set: {
                nome: this.nome,
                concluida: this.concluida
            } 
        });
    }

    
    async deletar() {
        const collection = await this.getCollection();
        
        await collection.deleteOne({
            nome: this.nome
        });
    }

    
    async buscar() {
        const collection = await this.getCollection();
       
        const resultado = await collection.findOne({
            nome: this.nome
        });

        if (resultado) {
            
            this.id = resultado._id;
            this.nome = resultado.nome;
            this.concluida = resultado.concluida;
        }
        return resultado;
    }
}


export { Tarefa };