# licenses-list-generator
> Fetch licences types and texts from all dependencies (and their dependencies) from your project. 

# Inspiration
Licenses...

## Installation
```sh
npm i -P node-image-resizer
```

## Usage
```javascript
import licensesList from 'licenses-list-generator';
const licenses = licensesList();
```

Function returns array of objects with properties:

name | type | description
---|---|---
name | string | dependency name (from package.json)
path | string| path to dependency, starting from root 
text | string| license text (see below)
type | string | license type (from package.json)
version | string | module version (from package.json)

*Undefined* is all cases if not found.

Function returns license information to module/project from which is run as well.

# How Licenses are found and read
It is recursive walk through *dependencies* from package.json (to find dependencies and all sub-dependencies). 
License text comes from *LICENSE* or *LICENCE* or *LICENSE.md* or *LICENSE.txt* or *LICENSE.markdown* files.
Other information comes from package.json file.


Returned array contain information related project dependencies ONLY. 
__NOT *devDependencies*__.

#License
MIT