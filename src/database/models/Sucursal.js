module.exports = (sequelize, datatypes) => {
    const alias = 'Sucursal';
    const cols = {
        id: {
            type : datatypes.INTEGER(11),
            primaryKey : true,
            autoIncrement : true,
        },
        nombre : {
            type : datatypes.STRING(100),
            allowNull : false,
        },
        direccion : {
            type : datatypes.STRING(100),
            allowNull : false,
        },
        telefono : {
            type : datatypes.INTEGER(11),
            allowNull : false,
        },
        imagen : {
            type : datatypes.STRING(255),
            allowNull : false,
        }
    }
    const config = {
        tableName : 'sucursales',
        timestamps : false,
    };
    const Sucursal = sequelize.define(alias, cols, config)

    Sucursal.associate = models => {
        Sucursal.hasMany(models.Auto, {
            as : 'autos',
            foreignKey : 'sucursalId'
        })
    }

    return Sucursal
}