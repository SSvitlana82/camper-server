const parseCamperType = (camperType) => {
  const isString = typeof camperType === 'string';
  if (!isString) return;
  const isType = (camperType) =>
    ['work', 'home', 'personal'].includes(camperType);

  if (isType(camperType)) return camperType;
};

const parseBoolean = (boolean) => {
  const isString = typeof boolean === 'string';
  if (!isString) return;
  const isBoolean = (boolean) => ['true', 'false'].includes(boolean);
  if (isBoolean(boolean)) return boolean;
};

export const parseFilterParams = (query) => {
  const parsedType = parseCamperType(query.camperType);
  const parsedIsFavourite = parseBoolean(query.isFavourite);
  return {
    camperType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
