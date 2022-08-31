const { Dog, Temperament } = require('../db');

const getAllDogsToDB = async () => {

    let dogsBD2 = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });

    // $ modificaciones extras!!, se busca q mis list de "dogs" provenientes de DB, tenga la misma estrucutura que en la API.

    let temp = JSON.stringify(dogsBD2)
    temp = JSON.parse(temp)

    // * modifica los "temperament" a un string, igual que la API.
    temp = temp.map(obj => {
        let tempString = [];
        obj.temperaments.forEach(objChildren => {
            tempString.push(objChildren.name);
        })
        delete obj.temperaments;
        return {
            ...obj,
            temperament: tempString.toString().replace(/,/g, ", ")
        };
    });

    // * calcula y agrega la media del peso.
    return temp.map((data) => {
        let middle = 0;

        min = parseInt(data.weight.split(" - ")[0]);
        max = parseInt(data.weight.split(" - ")[1]);
        middle = (min + max) / 2;

        return {
            ...data,
            temperament: data.temperament.toLowerCase(),
            breed_group: data.breed_group.charAt(0).toUpperCase() + data.breed_group.slice(1),
            middle,
        };
    });
}


const getAllTemperamentsToDB = async () => {

    let tempeDB = await Temperament.findAll();

    tempeDB = JSON.stringify(tempeDB);
    tempeDB = JSON.parse(tempeDB);

    return tempeDB.map(obj => obj.name.toLowerCase());
}

module.exports = {
    getAllDogsToDB,
    getAllTemperamentsToDB
}