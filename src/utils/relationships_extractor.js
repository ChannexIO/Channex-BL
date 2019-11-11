function extractRelationshipsFromEntity(model) {
  Object.keys(model.relationships || {}).forEach(key => {
    if (Array.isArray(model.relationships[key].data)) {
      model.attributes[key] = model.relationships[key].data
        .map(el => el.attributes)
        .reduce((acc, el) => {
          acc[el.id] = el;
          return acc;
        }, {});
    } else {
      model.attributes[`${key}_id`] = model.relationships[key].data.id;
      model.attributes[key] = model.relationships[key].data;
    }
  });

  return model.attributes;
}

function extractRelationships(models) {
  let result;

  if (Array.isArray(models)) {
    result = models.reduce((acc, el) => {
      acc[el.id] = extractRelationshipsFromEntity(el);
      return acc;
    }, {});
  } else {
    result = extractRelationshipsFromEntity(models);
  }

  return result;
}

export default extractRelationships;
