const MongoLib = require('../lib/mongo')

class MaquinasService{
    constructor(){
        this.collection = 'maquinas';
        this.mongoDB = new MongoLib();
    }

    async getMaquinas() {
        const maquinas = await this.mongoDB.getMaquinas(this.collection);
        return maquinas || [];
    }

    async getMaquina(maquinaId) {
        const maquina = await this.mongoDB.getMaquina(this.collection, maquinaId);
        return maquina || null;
      }
      


}
module.exports = MaquinasService