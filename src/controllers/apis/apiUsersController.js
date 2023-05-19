const { Usuario } = require('../../database/models')
const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;

module.exports = {
    all : async (req, res) => {
        try {
            let users = await Usuario.findAll({
                attributes : [ "id", "nombre", "apellido", "email" ]
            })
            if(users.length == 0) throw 'No hay usuarios';
            return res.status(200).json({
                meta : {
                    endPoint: getUrl(req),
                    total : users.length,
                    status : 200,
                },
                users,
            })
        } catch (error) {
            console.log(error);
            return res.status(404).json({
                meta : {
                    status : 404,
                    msg : error,
                }
            })
        }
    },
    one : async (req, res) => {
        const { id } = req.params;
        if(isNaN(id)) {
            return res.status(404).json({
                meta : {
                    status : 404,
                    msg : `Parametro invalido : ${id}`,
                }
            })
        }
        try {
            const user = await Usuario.findByPk(id, {
                attributes : [ "id", "nombre", "apellido", "email" ]
            })
            if(!user) throw 'No encontrado';
            return res.status(200).json({
                meta : {
                    endPoint: getUrl(req),
                    status : 200,
                },
                user,
            })
        } catch (error) {
            return res.status(404).json({
                meta : {
                    status : 404,
                    msg : error,
                }
            })
        }
    },
}