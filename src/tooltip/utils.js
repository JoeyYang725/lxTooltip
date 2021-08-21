export default function isEqual(a,b) {
  let aProps = Object.keys(a)
  let bProps = Object.keys(b)
  if(aProps.length !== bProps.length){
    return false
  }
  for (let i = 0; i < aProps.length; i++){
    let propName = aProps[i]
    if(a[propName] !== b[propName]) {
      return false
    }
  }
  return true
}