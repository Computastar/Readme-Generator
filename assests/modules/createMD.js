const fs = require('fs');

function capitaliseFirstLetter(stringInput)
{
  return stringInput.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}
// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(response) {
  if (`${response.license}` === "None") {
    return("")
  } else {var uriComponent = `${response.license}`.replace(/ /g, "_");
  return (`<img src="https://img.shields.io/badge/License-${uriComponent}-blue.svg">\n`)
  }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(response) {
  if (`${response.license}` === "None") {
  return("")
} else {return (`* [License](#license)\n`)
}
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(response) {
  if (`${response.license}` === "None") {
    return("")
} else {return (`## License\n
  ${response.license}\n`)
}
}

// TODO: Create a function to generate markdown for README
function createMD(response) {
  var markdown =  `# ${response.title}\n
  ${capitaliseFirstLetter(response
    .description)}\n

  ${renderLicenseBadge(response)}\n

## Table of Contents \n
* [Installation](#installation) \n
* [Usage](#usage) \n
* [Contributors](#contributors) \n
* [Tests](#tests) \n
* [Questions](#questions) \n
${renderLicenseLink(response)} \n

## Installation \n
  ${capitaliseFirstLetter(response.installation)}\n

## Usage \n
  ${capitaliseFirstLetter(response.usage)}\n

## Contributors \n
  ${response.contributors}\n

## Tests\n
  ${capitaliseFirstLetter(response.tests)}\n

## Questions\n
  Github: [${response.github}](${response.html_url})\n
  Email: ${response.email}\n
  
${renderLicenseSection(response)}`

/* write file with with Title as name*/
  fs.writeFile(`README-${response.title}.md`, markdown, (err) =>
  err ? console.error(err) : console.log('Success!'))
 
}

module.exports = createMD;
