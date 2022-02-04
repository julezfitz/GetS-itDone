const toCamel = object => {
	for (key in object) {
		key.replace(/([-_][a-z])/gi, $1 => {
			return $1.toUpperCase().replace("-", "").replace("_", "");
		});
	}

  console.log('object', object)
};

module.exports = toCamel;
