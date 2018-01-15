# licenses-list-generator
> Fetch licences types and texts from all dependencies (and their dependencies) from your project. 

# Inspiration
Open Source & legal team and a massive number of manual work... 

## Installation
```sh
npm install node-image-resizer --save-dev
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

Function returns license information to module/project from which is called as well.

# How licenses are found and read
It is recursive walk through __*dependencies*__ from package.json (to find dependencies and its all sub-dependencies). 
License text comes from *LICENSE* or *LICENCE* or *LICENSE.md* or *LICENSE.txt* or *LICENSE.markdown* file.
Other information, like license type, name or version, come from package.json file.


Returned array contains information related project dependencies ONLY. 
__NOT *devDependencies*__.

# License
MIT
