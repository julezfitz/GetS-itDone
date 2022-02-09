const trimFields = (object) => {
  const newObj = {...object}
  Object.keys(newObj).forEach(key => newObj[key] = newObj[key].trim());
  console.log(newObj)
  return newObj;
}

module.exports = trimFields;