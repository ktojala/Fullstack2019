const t = [1, -1, 3]
const t2 = t.concat(5)

console.log(t)
console.log(t2)

const m1 = t.map(value => value*2)
console.log(m1)

const m2 = t.map(value => '<li>' + value*2 + '</li>')
console.log(m2)

const p = [1,2,3,4,5]
const [first, second, ...rest] = p
console.log(first, second)
console.log(rest)

const object1 = {
    name: 'Arto Hellas',
    age: 35,
    education: 'Filosofian tohtori',
  }
  
  const object12 = {
    name: 'Full Stack -websovelluskehitys',
    level: 'aineopinto',
    size: 5,
  }
  
  const object3 = {
    name: {
      first: 'Juha',
      last: 'Tauriainen'
    },
    grades: [2, 3, 5, 3],
    department: 'TKTL',
  }

console.log(object1.name)         // tulostuu Arto Hellas
const fieldName = 'age' 
console.log(object1[fieldName])   // tulostuu 35

object1.address = 'Tapiola'
object1['secred number'] = 12341

console.log(object1['secred number'])   // tulostuu 12341

const sum = (p1, p2) => {
    console.log(p1)
    console.log(p2)
    return p1 + p2
}

const result = sum(1, 5)
console.log('sum ' + result)
console.log()

const square = q => {
    console.log(q)
    return q * q
}

console.log(square(5))

const squ = s => s*s

const tt = [1, 2, 3]
const tSquared = tt.map(p => p * p)
console.log(tSquared)
// tSquared on nyt [1, 4, 9]



function product(a, b) {
    return a * b
  }
const vast1 = product(2, 6)
console.log(vast1)

const average = function(a, b) {
    return (a + b) / 2
  }
const vast2 = average(2, 5)
console.log(vast2)