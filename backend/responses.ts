export const getSuccessResponse = (results: object, newObject?: object) => {
  return { success: "true", results: results, newObject: newObject };
};

export const getFailureResponse = (err: object) => {
  return { success: "false", error: err };
};
