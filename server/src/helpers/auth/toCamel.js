const toCamel = object => {
	let keys = Object.keys(object);
	keys.forEach(key => {
		key = key.split("")
	})

	

  console.log(keys)
};

module.exports = toCamel;
