export const getRandomInteger = (min = 0, max = 1) => Math.floor(min + Math.random() * (max + 1 - min));

export const twoDigits = (num) => (`0${num}`).slice(-2);

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
