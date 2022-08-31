const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const { getAllDogs, getDogsByidRaza, getAllTemperament } = require("../helpers/apiConnection");
const { getAllDogsToDB, getAllTemperamentsToDB } = require("../helpers/DBConecction");
const { allValidate } = require("../helpers/validation");
const { upperCaseList, firsUpperCase } = require("../helpers/useManagerText");

const router = Router();

router.post('/dogs', async (req, res) => {

    let allDataOk = true;
    let { name, image, minHeight, maxHeight, minWeight, maxWeight, breed_group, minLife, maxLife, temperament } = req.body;
    name = name.toLowerCase();

    // * si existe una validación falsa, rechazo la petición.
    const listValidates = allValidate(req.body);
    listValidates.forEach(obj => { obj.condition === false && (allDataOk = false) });

    if (!allDataOk) res.status(400).send('error, data invalid');
    else {
        try {
            // * si existe ya ese nombre de "dog", rechazo la petición.
            await Dog.findOne({ where: { name } })
                .then(obj => {
                    if (obj) throw new Error("dog refused, name already exists");
                });

            // * push a la DB.
            const dog = await Dog.create({
                name,
                image: !image.length ? "https://i.postimg.cc/mrHB0JMT/perros-vitabull.png" : image,
                height: `${minHeight} - ${maxHeight}`,
                weight: `${minWeight} - ${maxWeight}`,
                breed_group: breed_group.toLowerCase(),
                life_span: `${minLife} - ${maxLife} years`
            });

            if (temperament) {

                // * chequeo de si "temperament" es real.
                temperament.forEach(async string => {

                    let tempe = await Temperament.findOne({
                        where: { name: firsUpperCase(string) }
                    })

                    // * si existe, añade la relación a mi "dog".
                    await dog.addTemperaments(tempe);
                });
            }

            res.status(201).json({ dog });
        }
        catch (e) {
            res.status(400).json({ msg: e.message, status: 400 });
        }
    }
});


router.get('/dogs', async (req, res) => {

    try {
        const name = req.query.name;
        const dogsBD = await getAllDogsToDB();
        const dogsApi = await getAllDogs();
        let allDogs = dogsBD && [...dogsBD, ...dogsApi] || dogsApi;

        if (name) allDogs = allDogs.filter(obj => obj.breed_group === name);

        res.status(200).json(allDogs);

    } catch (error) {
        const { message = "", status = 500 } = error;
        res.status(status).json({ message, status });
    }
}

);

router.get('/dogs/:idRaza', async (req, res) => {

    try {
        // * conversión de a int o string.
        const idRaza = !isNaN(req.params.idRaza) && parseInt(req.params.idRaza) || req.params.idRaza;

        const dogsApi = await getDogsByidRaza();
        const dogsBD = await getAllDogsToDB();

        let allDogs = dogsBD && [...dogsBD, ...dogsApi] || dogsApi;

        allDogs = allDogs.find(obj => obj.id === idRaza);

        if (allDogs) res.status(200).json(allDogs);
        else throw new Error();

    } catch (error) {
        const { message = "dog not found", status = 404 } = error;
        res.status(status).json({ message, status });
    }
}

);

router.get('/temperaments', async (req, res) => {

    const temperamentsDB = await getAllTemperamentsToDB() || [];
    const temperamentsAPI = await getAllTemperament();

    const lowerCaseList = (list) => {
        return list.map(string => string.toLowerCase());
    }

    try {

        if (!temperamentsDB.length) {
            res.status(200).json(lowerCaseList(temperamentsAPI));
            temperamentsAPI.forEach(async string => {
                await Temperament.create({
                    name: string
                });
            })
        }
        else res.status(200).json(temperamentsDB);

    } catch (error) {
        const { message = "lost connection...", status = 500 } = error;
        res.status(status).json({ message, status });
    }
}
);

router.patch('/dogs/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const body = req.body;
        const { name, image, minHeight, maxHeight, minWeight, maxWeight, breed_group, minLife, maxLife } = req.body;

        // * si existe una validación falsa, rechazo la petición.
        let allDataOk = true;
        const listValidates = allValidate(req.body);
        listValidates.forEach(obj => { obj.condition === false && (allDataOk = false) });
        if (!allDataOk) throw new Error('error, data invalid');


        // * si no existe en la DB, rechazo la petición.
        await Dog.findOne({ where: { id } })
            .then(obj => {
                if (!obj) {
                    throw new Error("dog refused, your dog not found")
                };
                if (!obj.from_BD) throw new Error("dog refused, it's not yours");
            })

        await Dog.update(
            {
                name,
                image: !image.length ? "https://i.postimg.cc/mrHB0JMT/perros-vitabull.png" : image,
                height: `${minHeight} - ${maxHeight}`,
                weight: `${minWeight} - ${maxWeight}`,
                breed_group: breed_group.toLowerCase(),
                life_span: `${minLife} - ${maxLife} years`

            },
            { where: { id } })
            .then((dog) => {
                res.status(202).json({ msg: `your dog ${name} updated successfully` });
            })

    } catch (e) {
        res.status(400).json({ msg: e.message, status: 400 });
    }

});

router.delete('/dogs/:id', async (req, res) => {
    try {

        const id = req.params.id;

        // * si no existe en la DB, rechazo la petición.
        await Dog.findOne({ where: { id } })
            .then(obj => {
                if (!obj) {
                    throw new Error("dog refused, your dog not found")
                };
                if (!obj.from_BD) throw new Error("dog refused, it's not yours");

            })

        await Dog.destroy(
            { where: { id } })
            .then((dog) => {
                res.status(202).json({ msg: `dog delete successfully` });
            })

    } catch (e) {
        res.status(400).json({ msg: e.message, status: 400 });
    }

});
module.exports = router;
