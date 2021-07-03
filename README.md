# add-roles

This node script processes a file in the Aserto JSON "User" structure format (for example, the `acmecorp.json` file), and augments it with a `peoplefinder` application, containing the roles `viewer`, `editor`, `admin`.

## install deps

`yarn install`

## run the script

`node index.js acmecorp.json > output.json`
