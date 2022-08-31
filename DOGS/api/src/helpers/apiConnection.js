const axios = require('axios');

const getAllDogs = async (baseURL = "https://api.thedogapi.com/v1/breeds") => {

    const intance = axios.create(
        { baseURL },
        { headers: { "x-api-key": "a3d61b7c-2809-4edb-9df5-5b9a6fe8b6a9" } }
    );

    // envia la petición y la almacena.
    const { data } = await intance.get();

    return data.map(({ id, name, image, weight, temperament, breed_group }) => {
        let middle = 0;

        if (temperament) temperament = temperament.toLowerCase();
        else temperament = "unknown";

        if (weight.metric) {
            min = parseInt(weight.metric.split(" - ")[0]);
            max = parseInt(weight.metric.split(" - ")[1]);
            middle = (min + max) / 2;
        }
        if (weight.metric.includes(NaN) || weight.metric.length < 3) weight = "?? - ??";
        else weight = weight.metric;
        return {
            id,
            name: name.toLowerCase(),
            image: image.url,
            temperament,
            weight,
            middle,
            breed_group,
            from_BD: false,
        };
    });
}

const getDogsByidRaza = async (baseURL = "https://api.thedogapi.com/v1/breeds") => {

    const intance = axios.create(
        { baseURL },
        { headers: { "x-api-key": "a3d61b7c-2809-4edb-9df5-5b9a6fe8b6a9" } }
    );

    // envia la petición y la almacena.
    const { data } = await intance.get();

    return data.map(({ id, name, image, height, weight, temperament, life_span, breed_group }) => {

        if (weight.metric.includes(NaN)) weight = "?? - ??";
        else weight = weight.metric;

        return {
            id,
            name: name.toLowerCase(),
            image: image.url,
            temperament,
            weight,
            height: height.metric,
            breed_group,
            life_span,
            from_BD: false,
        };
    });
}

const getAllTemperament = async (baseURL = "https://api.thedogapi.com/v1/breeds") => {

    let results = [];

    const intance = axios.create(
        { baseURL },
        { headers: { "x-api-key": "a3d61b7c-2809-4edb-9df5-5b9a6fe8b6a9" } }
    );

    // envia la petición y la almacena.
    const { data } = await intance.get();

    data.forEach(({ temperament }) => {
        // * guardar sin repetir todos los "temperaments".
        // * en caso que un "dog" tenga "null" tal prop. pasar de largo.
        temperament && temperament.split(", ").forEach(string => {
            if (!results.includes(string)) results.push(string);
        });
    });
    return results;

}

module.exports = {
    getAllDogs,
    getDogsByidRaza,
    getAllTemperament
}