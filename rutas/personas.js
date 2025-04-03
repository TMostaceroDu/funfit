const express = require('express');

const PersonasService = require('../servicios/personasService');

function personasAPI(app){
    const router = express.Router();
    app.use('/usuarios', router);

    const personasService = new PersonasService();

    router.get('/', async function (req, res, next) {
        try {
            const personas = await personasService.getUsuarios(); 
            res.status(200).json({
                data: personas,
                message: 'Personas obtenidas con éxito'
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/clientes', async function (req, res, next) {
        try {
            const personas = await personasService.getClientes(); 
            res.status(200).json({
                data: personas,
                message: 'Clientes obtenidos con éxito'
            });
        } catch (err) {
            next(err);
        }
    });

    router.get('/:personaId', async function (req, res, next) {
        const { personaId } = req.params; 

    
        try {
            const usuario = await personasService.getUsuario(personaId);
            
            if (usuario) {
                res.status(200).json({
                    data: usuario,
                    message: 'Usuario obtenido con éxito'
                });
            } else {
                res.status(404).json({
                    message: 'Persona no encontrada'
                });
            }
        } catch (err) {
            next(err);
        }
    });
    
    router.put('/:personaId', async function (req, res, next) {
        const { personaId } = req.params;
        const personaData = req.body; 
    
        try {
            const personaActualizada = await personasService.updateUsuario(personaId, personaData);
    
            res.status(200).json({
                data: personaActualizada,
                message: 'Persona actualizada con éxito'
            });
        } catch (err) {
            next(err);
        }
    });

    router.post('/:id/rutinas', async (req, res, next) => {
        try {
            const { id } = req.params;
            const rutina = req.body;
    
            const resultado = await personasService.addRutinaToPersona(id, rutina);
            
            if (resultado.modifiedCount > 0) {
                res.status(200).json({
                    message: 'Rutina añadida con éxito',
                    personaId: id
                });
            } else {
                res.status(400).json({
                    message: 'No se pudo agregar la rutina'
                });
            }
        } catch (err) {
            next(err);
        }
    });

    router.put('/:id/rutinas/:maquinaId', async (req, res, next) => {
        try {
          const { id, maquinaId } = req.params;
          const nuevaRutina = req.body;
      
          const resultado = await personasService.updateRutina(id, maquinaId, nuevaRutina);
      
          if (resultado.modifiedCount > 0) {
            res.status(200).json({
              message: 'Rutina actualizada con éxito',
              personaId: id
            });
          } else {
            res.status(400).json({
              message: 'No se pudo actualizar la rutina'
            });
          }
        } catch (err) {
          next(err);
        }
      });
      
      router.delete('/:id/rutinas/:maquinaId', async (req, res, next) => {
        try {
          const { id, maquinaId } = req.params;
      
          const resultado = await personasService.deleteRutina(id, maquinaId);
      
          if (resultado.modifiedCount > 0) {
            res.status(200).json({
              message: 'Rutina eliminada con éxito',
              personaId: id
            });
          } else {
            res.status(404).json({
              message: 'No se encontró la rutina a eliminar'
            });
          }
        } catch (err) {
          console.error('Error ', err);
          next(err);
        }
      });
      

}

module.exports = personasAPI;