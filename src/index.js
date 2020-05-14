/**
 * Deep compare objects
 * @return {Boolean} – true if equal
 */
function compareObjects(obj1, obj2) {
  if (obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }

  if (obj1._isAMomentObject) return obj1.isSame(obj2);
  if (obj2._isAMomentObject) return obj2.isSame(obj1);

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  return Object.keys(obj1).every(function(key) {
    return compare(obj1[key], obj2[key]);
  });
}

/**
 * Compare arrays that contains only simple data (number, string, bool)
 * @return {Boolean} – true if equal
 */
function compareArrays(list1, list2) {
  if (list1.length !== list2.length) {
    return false;
  }

  return list1.every(function(item, i) {
    return compare(item, list2[i]);
  });
}

/**
 * Function-router to campare different types
 * @return {Boolean} – true if equal
 */
export default function compare(val1, val2) {
  if (typeof val1 !== typeof val2) {
    return false;
  }

  if (typeof val1 === 'object') {
    return compareObjects(val1, val2);
  }

  if (Array.isArray(val1)) {
    return compareArrays(val1, val2);
  }

  return val1 === val2;
}
