module.exports = (sequelize, datatypes) => {
	const alias = "Auto";
	const cols = {
		id: {
            type : datatypes.INTEGER(11),
            primaryKey : true,
            autoIncrement : true,
        },
		marca: {
            type : datatypes.STRING(100),
            allowNull : false,
        },
		modelo: {
            type : datatypes.STRING(100),
            allowNull : false,
        },
		anio: {
            type : datatypes.INTEGER(11),
            allowNull : false,
        },
		color: {
            type : datatypes.STRING(25),
            allowNull : false,
        },
		sucursalId: {
            type : datatypes.INTEGER(11),
            allowNull : false,
        },
	};
	const config = {
        tableName : 'autos',
        timestamps : false,
    };

	const Auto = sequelize.define(alias, cols, config);

    Auto.associate = models => {
        Auto.hasMany(models.Imagen, {
            as : 'imagenes',
            foreignKey : 'autoId'
        })
        
        Auto.belongsTo(models.Sucursal, {
            as : 'sucursal',
            foreignKey : 'sucursalId'
        })
    }

	return Auto;
};