export const formatSubmitForm = (formatData) => {
  const { containerDetails, ...allData } = formatData;

  let table1 = {};

  for (let key in allData) {
    if (typeof allData[key] === "object") {
      table1[key] = allData[key]?.Id;
    } else {
      table1[key] = allData[key];
    }
  }

  const table2 = containerDetails?.map((item) => {
    let result = {};
    for (let key in item) {
      if (typeof item[key] === "object") {
        result[key] = item[key]?.Id;
      } else {
        result[key] = item[key];
      }
    }
    return result;
  });

  return {
    table1,
    table2,
  };
};
