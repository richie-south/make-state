const shallowEqual = (objA, objB) => {
  if (!objA || !objB) {
    return objA === objB
  }
  return !Boolean(
    Object
      .keys(Object.assign({}, objA, objB))
      .find((key) => objA[key] !== objB[key])
  )
}

exports.shallowEqual = shallowEqual
