export const getDummyItems = (count = 50) => {
  let items = [];
  for (var i = 0; i < count; i++) {
    const n = i + 1;
    items.push({
      _id: `item${n}`,
      views: getRandom(10, 400),
      name: `Item ${n}`,
      price: getRandom(300, 2000),
      currency: 'INR',
      description: `This is a <strong>good</strong> item ${n}`,
      quantity: getRandom(10, 50),
      date: `21/0${getRandom(1, 9)}/2019`,
      colors: ['black', 'green'],
      photos: [
        `https://dummyimage.com/600x400/ebebeb/999999.jpg&text=item${n}-1`,
        `https://dummyimage.com/600x400/ebebeb/999999.jpg&text=item${n}-2`,
        `https://dummyimage.com/600x400/ebebeb/999999.jpg&text=item${n}-3`
      ],
      tags: [
        dummyTags[getRandom(0, dummyTags.length - 1)],
        dummyTags[getRandom(0, dummyTags.length - 1)]
      ]
    });
  }
  return items;
};

export const dummyTags = [
  'black',
  'saree',
  'red',
  'silk',
  'tant',
  'gorod',
  'blue'
];

function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
