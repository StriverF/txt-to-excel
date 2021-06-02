export const unique = (array) => {
  var sortArr = array.concat().sort()
  var res = [sortArr[0]]
  for (var i = 1; i < sortArr.length; i++) {
    if (sortArr[i] !== sortArr[i - 1]) {
      res.push(sortArr[i])
    }
  }
  return res
}
