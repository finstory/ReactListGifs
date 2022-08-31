// $ STRING :

const { getAllTemperamentsToDB } = require("./DBConecction");
const { getAllTemperaments } = require("./apiConnection");

const noNumbersAndOnlyString = (string) => {
    //* prohibo inyección de n°.
    if (typeof string !== "string") return { condition: false, msg: "✱ only letters !" };

    //* realmente debe conterner letras y no n°.
    let bool = true;
    const array = string.replace(/ /g, "").split("");

    array.forEach(char => { if (!isNaN(char) || char === " ") bool = false });

    if (!bool) return { condition: false, msg: "✱ only letters !" };
    return { condition: true };
}

const maxAndMinLength = (string) => {
    if (string.length < 3) return { condition: false, msg: "✱ it's too short !" };
    if (string.length >= 20) return { condition: false, msg: "✱ it's too large !" };
    return { condition: true };
}

// * NUBMERS :

const OnlyIntNumber = (number) => {

    //* debe ser entero.
    if (parseFloat(number) !== Math.round(parseFloat(number))) return { condition: false, msg: "✱ only int numbers !" };

    //* realmente debe conterner n° y no letras.
    let bool = true;
    const array = number.replace(/ /g, "").split("");
    array.forEach(char => { if (isNaN(char) || char === " ") bool = false });
    if (!bool) return { condition: false, msg: "✱ only int numbers !" };

    return { condition: true };
}


const minValue = (min) => {

    if (parseInt(min) <= 1) return { condition: false, msg: "✱ it's too small !" };
    return { condition: true };
}

const maxValue = (max) => {
    if (parseInt(max) >= 60) return { condition: false, msg: "✱ it's too big !" };
    return { condition: true };
}

const maxAndMinValue = (min, max) => {
    if (parseInt(min) >= parseInt(max)) return { condition: false, msg: "✱ min >= max !" };

    return { condition: true };
}

// ? TEMPERAMENTS :
const validateTemeperaments = (queryTempe) => {

    if (!queryTempe.length) return { condition: false, msg: "✱ select at least one temperament !" };

    // * si se repiten temp. se rechaza.
    let listNoRepite = [];
    queryTempe.forEach(string => { !listNoRepite.includes(string) && listNoRepite.push(string) });

    if (listNoRepite.length !== queryTempe.length) {
        return { condition: false, msg: "✱ repeated temperaments !" };
    }

    return { condition: true };

}

const allValidate = (inputValue) => {
    const listErrors = [];

    const { name, minHeight, maxHeight, minWeight, maxWeight, minLife, maxLife, breed_group, temperament } = inputValue;

    // * todos los datos deben llegar como strings.
    if (typeof name !== "string" || typeof minHeight !== "string" || typeof maxHeight !== "string" || typeof minWeight !== "string" || typeof maxWeight !== "string" || typeof minLife !== "string" || typeof maxLife !== "string" || typeof breed_group !== "string" || !temperament.length)
        return [{ condition: false, msg: "data invalid!" }];

    // * estos datos son requisito.
    if (!name || !minHeight || !maxHeight || !minWeight || !maxWeight || !minLife || !maxLife || !breed_group || !temperament.length)
        return [{ condition: false, msg: "Missing fields!" }];


    listErrors.push({ ...noNumbersAndOnlyString(name), type: "name" });
    listErrors.push({ ...maxAndMinLength(name), type: "name" });

    listErrors.push({ ...noNumbersAndOnlyString(breed_group), type: "breed_group" });
    listErrors.push({ ...maxAndMinLength(breed_group), type: "breed_group" })

    listErrors.push({ ...minValue(minHeight), type: "minHeight" });
    listErrors.push({ ...minValue(minWeight), type: "minWeight" })
    listErrors.push({ ...minValue(minLife), type: "minLife" })
    listErrors.push({ ...maxValue(minHeight), type: "minHeight" });
    listErrors.push({ ...maxValue(minWeight), type: "minWeight" })
    listErrors.push({ ...maxValue(minLife), type: "minLife" })
    listErrors.push({ ...OnlyIntNumber(minHeight), type: "minHeight" })
    listErrors.push({ ...OnlyIntNumber(minWeight), type: "minWeight" })
    listErrors.push({ ...OnlyIntNumber(minLife), type: "minLife" })

    listErrors.push({ ...maxValue(maxHeight), type: "maxHeight" });
    listErrors.push({ ...maxValue(maxWeight), type: "maxWeight" })
    listErrors.push({ ...maxValue(maxLife), type: "maxLife" })
    listErrors.push({ ...minValue(maxHeight), type: "maxHeight" });
    listErrors.push({ ...minValue(maxWeight), type: "maxWeight" })
    listErrors.push({ ...minValue(maxLife), type: "maxLife" })
    listErrors.push({ ...OnlyIntNumber(maxHeight), type: "maxHeight" });
    listErrors.push({ ...OnlyIntNumber(maxWeight), type: "maxWeight" })
    listErrors.push({ ...OnlyIntNumber(maxLife), type: "maxLife" })

    listErrors.push({ ...maxAndMinValue(minHeight, maxHeight), type: "minHeight" })
    listErrors.push({ ...maxAndMinValue(minHeight, maxHeight), type: "maxHeight" })

    listErrors.push({ ...maxAndMinValue(minWeight, maxWeight), type: "minWeight" })
    listErrors.push({ ...maxAndMinValue(minWeight, maxWeight), type: "maxWeight" })

    listErrors.push({ ...maxAndMinValue(minLife, maxLife), type: "minLife" })
    listErrors.push({ ...maxAndMinValue(minLife, maxLife), type: "maxLife" })
    listErrors.push({ ...validateTemeperaments(temperament), type: "temperament" });

    return listErrors;
}
module.exports = {
    allValidate
}