const fs = require('fs')

module.exports = {
    sucursales : JSON.parse(fs.readFileSync('./src/data/sucursales.json', 'utf-8')),
    autos : JSON.parse(fs.readFileSync('./src/data/autos.json', 'utf-8')),
    writeJsonSucursales : (data) => {
        fs.writeFileSync('./src/data/sucursales.json', JSON.stringify(data), 'utf-8')
    },
    writeJsonAutos : (data) => {
        fs.writeFileSync('./src/data/autos.json', JSON.stringify(data), 'utf-8')
    },
}