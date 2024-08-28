const parseCamperDetails = (camperType) => {
  const isString = typeof camperType === 'string';
  if (!isString) return;
  return camperType.split(',');
};

export const parseFilterParams = (query) => {
  const parsedType = parseCamperDetails(query.form);
  const parsedDetails = parseCamperDetails(query.details);
  const parsedLocation = query.location;
  return {
    form: parsedType,
    details: parsedDetails,
    location: parsedLocation,
  };
};
