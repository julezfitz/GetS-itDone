const trimFields = (object) => {
  const newObj = {...object}
  Object.keys(newObj).forEach(key => newObj[key] = newObj[key].trim());
  return newObj;
}

module.exports = trimFields;