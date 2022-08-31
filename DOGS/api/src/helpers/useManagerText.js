

const upperCaseList = (list) => {
    return list.map((string) => string[0].toUpperCase() + string.substring(1));
};

const firsUpperCase = (string) => {
    return string[0].toUpperCase() + string.substring(1);
};

module.exports = {
    upperCaseList,
    firsUpperCase
}