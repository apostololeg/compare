function compareObjectsConfig(c) {
  var cfg = Object(c);
  var key = cfg.key || 'key';
  var val = cfg.val || 'val';
  var l1Key = cfg.l1Key || key;
  var l2Key = cfg.l2Key || key;
  var l1Val = cfg.l1Val || val;
  var l2Val = cfg.l2Val || val;

  return {
    key: key,
    val: val,
    l1Key: l1Key,
    l2Key: l2Key,
    l1Val: l1Val,
    l2Val: l2Val,
  };
}

/**
 * Compare lists of objects
 *
 * @param  {Array} list1
 * @param  {Array} list2
 * @param  {Array} cfg – config fot key/value fields names
 *
 * @example
 * both lists has objects with fields to compare named 'key' and 'value':
 * compareArrayObjects(
 *  [{ key:1,
 value:1 }],
 *  [{ key:1, value:1 }],
 * )
 *
 * @example
 * both lists has objects with same fields names to compare,
 *  but different from 'key' and 'value':
 * compareArrayObjects(
 *  [{ id:1, val:1 }],
 *  [{ id:1, val:1 }],
 *  { key: 'id', val: 'val' },
 * )
 *
 * @example
 * every list has different fields names to compare:
 * compareArrayObjects(
 *  [{ id:1, val:1 }],
 *  [{ name:1, items:1 }],
 *  {
 *    l1Key: 'id',
 *    l1Val: 'val',
 *    l2Key: 'name',
 *    l2Val: 'items',
 *  }
 * )
 *
 * @example
 * only one field different from default key/value names:
 * compareArrayObjects(
 *  [{ key:1, value:1 }],
 *  [{ name:1, value:1 }],
 *  { l2Key: 'name' },
 * )
 *
 * @return {Boolean} – true if equal
 */
export default function compareArrayObjects(list1, list2, cfg) {
  var config = compareObjectsConfig(cfg);

  var l1Key = config.l1Key;
  var l2Key = config.l2Key;
  var l1Val = config.l1Val;
  var l2Val = config.l2Val;

  if (list1.length !== list2.length) {
    return false;
  }

  var list2Map = list2.reduce(
    function (acc, item) {
      acc[item[l2Key]] = item[l2Val];
      return acc;
    },
    {},
  );

  return list1.every(function(item) {
    return list2Map[item[l1Key]] === item[l1Val]
  });
};
