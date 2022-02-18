//Checks if request registration object contains any empty fields

checkIfEmpty = object => {
	const emptyFields = [];

	for (key in object) {
		if (object[key] === "" || !object[key]) {
			emptyFields.push({
				fieldName: key,
			});
		}
	}
	return emptyFields
};

module.exports = checkIfEmpty;
