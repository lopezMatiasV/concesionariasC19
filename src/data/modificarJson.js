const { autos, writeJsonAutos } = require(".");

(()=> {
    autos.forEach(auto => {
        auto.imagen = [auto.imagen]
    });
    writeJsonAutos(autos)
})()
