const MongoLib = require('../lib/mongo')

class PersonasService{
    constructor(){
        this.collection = 'usuarios';
        this.mongoDB = new MongoLib();
    }

    async getUsuarios(){
        const personas = await this.mongoDB.getUsuarios(this.collection);
        return personas || [];
    }

    async getClientes(){
        const rol = 'cliente';
        const clientes = await this.mongoDB.getUsuariosClientes(this.collection, rol);
        return clientes || [];
    }

    async getUsuario(personaId) {
        const persona = await this.mongoDB.getUsuario(this.collection, personaId);
        return persona || [];
      }

      async updateUsuario(personaId, persona = {}) {
      
        const { _id, ...personaSinId } = persona;
      
        const personaActualizada = await this.mongoDB.updateUsuario(
          this.collection,
          personaId,
          personaSinId
        );
      
        return personaActualizada || [];
      }
    

    async addRutinaToPersona(personaId, rutina) {
        const resultado = await this.mongoDB.pushToArray(this.collection, personaId, 'rutinas', rutina);
        return resultado || [];
    }


    async updateRutina(personaId, maquinaId, rutinaActualizada) {
        const resultado = await this.mongoDB.updateRutina(
          this.collection,
          personaId,
          maquinaId,
          rutinaActualizada
        );
        return resultado || [];
      }


      async deleteRutina(personaId, maquinaId) {
        const resultado = await this.mongoDB.deleteRutina(this.collection, personaId, maquinaId);
        return resultado || [];
      }
      
 
    
}
module.exports = PersonasService