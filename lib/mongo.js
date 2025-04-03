const { MongoClient, ObjectId } = require('mongodb')
const { config } = require('../config')

const DB_USER = config.DB_USER
const DB_PASSWORD = config.DB_PASSWORD
const DB_NAME = config.DB_NAME
const DB_HOST = config.DB_HOST


const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority&appName=Cluster0`


class MongoLib {
    async connect() {
        if(MongoLib.connection) {
            return MongoLib.connection.db(DB_NAME)
        }else{
            try {
                MongoLib.connection = await MongoClient.connect(MONGO_URI)
                console.log('conectado a BBDD')
                return MongoLib.connection.db(DB_NAME)
            } catch(e){
                console.log('error en conexión a BBDD')
                return e
            }
        }
    }


    async getMaquinas(collection){
        try {
            let db = await this.connect()
            let result = await db.collection(collection).find().toArray();
            return result;
        } catch (e) {
            return e;
        }
    }

    async getMaquina(collection, maquinaId) {
        try {
          const db = await this.connect();
          const result = await db.collection(collection).findOne({ id: parseInt(maquinaId) });
          return result;
        } catch (e) {
          console.error('Error al obtener máquina por id:', e);
          return null;
        }
      }

    async getUsuarios(collection){
        try {
            let db = await this.connect()
            let result = await db.collection(collection).find().toArray();
            return result;
        } catch (e) {
            return e;
        }
    }

    async getUsuariosClientes(collection, rol){
        try {
            let db = await this.connect()
            let result = await db.collection(collection).find({rol: rol}).toArray();
            return result;
        } catch (e) {
            return e;
        }
    }


    async getUsuario(collection, usuarioId) {
        try {
            
            if (!ObjectId.isValid(usuarioId)) {
                console.log('ID no válido:', usuarioId);
                return null;
            }
    
            let db = await this.connect();
            
            let result = await db.collection(collection).findOne({ _id: new ObjectId(usuarioId) });
    
            return result;
        } catch (e) {
            console.log('Error al obtener usuario por id:', e);
            return e;
        }
    }
    
    async updateUsuario(collection, id, data) {
        return this.connect().then(db => {
            return db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: data }, { upsert: true })
        }).then(result => result.insertedId || id);
    }

    async pushToArray(collection, id, arrayField, itemToPush) {
        const db = await this.connect();
      
        return db.collection(collection).updateOne(
          { _id: new ObjectId(id) },
          { $push: { [arrayField]: itemToPush } }
        );
    }

    async updateRutina(collection, usuarioId, maquinaId, rutinaActualizada) {
        try {
            const db = await this.connect(); 
        
            return await db.collection(collection).updateOne(
              {
                _id: new ObjectId(usuarioId),
                "rutinas.maquina.id": parseInt(maquinaId)
              },
              {
                $set: {
                  "rutinas.$": rutinaActualizada
                }
              }
            );
          } catch (e) {
            console.error("❌ Error en updateRutinaByMaquinaId:", e);
            throw e;
          }
    }

    async deleteRutina(collection, usuarioId, maquinaId) {
        try {
          const db = await this.connect(); 
      
          return await db.collection(collection).updateOne(
            { _id: new ObjectId(usuarioId) },
            { $pull: { rutinas: { "maquina.id": parseInt(maquinaId) } } }
          );
        } catch (e) {
          console.error("Error en deleteRutina:", e);
          throw e;
        }
      }
      
      

      
 
}

module.exports = MongoLib; 