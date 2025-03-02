exports.findEntityById = (res, id, records) => {
  const entity = records.find((record) => (record.id === id));
  if (!entity) {
    res.status(404).json({
      status: "error",
      message: "Entity not found",
    });
    return;
  }
  return entity;
};
