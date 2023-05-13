const { Usuario } = require('../../database/models')
const getUrl = (req) => req.protocol + '://' + req.get('host') + req.originalUrl;

module.exports = {
    all : async (req, res) => {
        try {
            let users = await Usuario.findAll()
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
        
    }
}