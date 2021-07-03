const fs = require('fs')

// check command line
if (process.argv.length !== 3) {
  console.error('Usage: add-roles <file.json>')
  process.exit(1)
}

const file = process.argv[2]
if (!file) {
  console.error('Usage: add-roles <file.json>')
  process.exit(1)
}

const users = require(`./${file}`)

//const users = fs.readFileSync(`./${file}`, 'utf8')

const transformedUsers = users.map(u => {
  const attr = u.attributes  
  if (!u.applications) {
    u.applications = {}
  }
  u.applications.peoplefinder = {}
  u.applications.peoplefinder.properties = attr && { ...attr.properties }
  if (attr && attr.properties && attr.properties.department === 'Operations') {
    if (attr.properties.title.includes('Manager')) {
      u.applications.peoplefinder.roles = ['admin']
    } else {
      u.applications.peoplefinder.roles = ['editor']
    }
  } else {
    u.applications.peoplefinder.roles = ['viewer']
  }

  return u
})

console.log(JSON.stringify(users, null, 2))
