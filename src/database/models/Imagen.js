module.exports = (sequelize, datatypes) => {
    const alias = 'Imagen';
    const cols = {
        id: {
            type : datatypes.INTEGER(11),
            primaryKey : true,
            autoIncrement : true,
        },
        file : {
            type : datatypes.STRING(100),
            allowNull : false,
        },
        autoId : {
            type : datatypes.INTEGER(11),
            allowNull : false,
        }
    }
    const config = {
        tableName : 'imagenes',
        timestamps : false,
    };
    const Imagen = sequelize.define(alias, cols, config)
    return Imagen
}