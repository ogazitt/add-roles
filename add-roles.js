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

const transformedUsers = users.map(u => {
  const attr = u.attributes  
  if (attr && attr.properties && attr.properties.department === 'Operations') {
    if (attr.properties.title.includes('Manager')) {
      attr.roles.push('admin')
    } else {
      attr.roles.push('editor')
    }
  } else {
    attr.roles.push('viewer')
  }

  return u
})

console.log(JSON.stringify(transformedUsers, null, 2))
