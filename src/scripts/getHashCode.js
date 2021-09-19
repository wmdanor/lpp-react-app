function getHashCode(object) {
  const objectString = JSON.stringify(object);
  let hash;
  for (let i = 0; i < objectString.length; i += 1)
    // eslint-disable-next-line no-bitwise
    hash = (Math.imul(31, hash) + objectString.charCodeAt(i)) | 0;

  return hash;
}

export default getHashCode;
