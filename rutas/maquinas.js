const express = require('express')

const MaquinasService = require('../servicios/maquinasService');

function maquinasAPI(app){
    const router = express.Router();
    app.use('/maquinas', router);

    const maquinasService = new MaquinasService();

    router.get('/', async function (req, res, next) {
        try {
            const maquinas = await maquinasService.getMaquinas(); 
            res.status(200).json({
                data: maquinas,
                message: 'Máquinas devueltas con éxito'
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/:maquinaId', async function (req, res, next) {
        const { maquinaId } = req.params; 
        console.log(`Buscando máquina con ID: ${maquinaId}`);
    
        try {
            const maquina = await maquinasService.getMaquina(maquinaId);
            if (maquina) {
                res.status(200).json({
                    data: maquina,
                    message: 'Máquina devuelta con éxito'
                });
            } else {
                res.status(404).json({
                    message: 'Máquina no encontrada'
                });
            }
        } catch (err) {
            next(err);
        }
    });
    
}

module.exports = maquinasAPI;