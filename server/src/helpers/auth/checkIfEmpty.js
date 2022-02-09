
//Checks if request registration object contains any empty fields

checkIfEmpty = object => {
		console.log(object)

	for (key in object) {
		if (object[key] === "" || !object[key]) {
			return true;
		}
	}
	return false;
};

module.exports = checkIfEmpty
