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
  let phone
  const ids = u.identities && Object.keys(u.identities)
  for (const id of ids) {
    const kind = u.identities[id].kind
    if (kind === "IDENTITY_KIND_PHONE") {
      phone = id
    }
  }
  if (phone) {
    if (!u.attributes) {
      u.attributes = {}
    }
    if (!u.attributes.properties) {
      u.attributes.properties = {}
    }
    u.attributes.properties.phone = phone
  }
  return u
})

console.log(JSON.stringify(transformedUsers, null, 2))
