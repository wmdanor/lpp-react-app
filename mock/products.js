function randomString(length) {
  const result = [];
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength)),
    );
  }
  return result.join('');
}

function getRandomImageUrl() {
  const seed = randomString(8);
  return `https://picsum.photos/seed/${seed}/300`;
}

const products = [
  {
    id: 1,
    name: 'Game gae',
    price: 10,
    imageUrl: getRandomImageUrl(),
  },
  {
    id: 2,
    name: 'Cock',
    price: 5,
    imageUrl: getRandomImageUrl(),
  },
  {
    id: 3,
    name: 'Anus',
    price: 30,
    imageUrl: getRandomImageUrl(),
  },
  {
    id: 4,
    name: 'Phone',
    price: 50,
    imageUrl: getRandomImageUrl(),
  },
  {
    id: 5,
    name: 'Shit',
    price: 2,
    imageUrl: getRandomImageUrl(),
  },
  {
    id: 6,
    name: 'PC',
    price: 80,
    imageUrl: getRandomImageUrl(),
  },
  {
    id: 7,
    name: 'Pen',
    price: 8,
    imageUrl: getRandomImageUrl(),
  },
  {
    id: 8,
    name: 'Lighter',
    price: 30,
    imageUrl: getRandomImageUrl(),
  },
  {
    id: 9,
    name: 'Mouse',
    price: 15,
    imageUrl: getRandomImageUrl(),
  },
];

module.exports = { products };
