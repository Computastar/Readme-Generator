const fs = require('fs');
const chalk = require("chalk");

function capitaliseFirstLetter(stringInput)
{
  return stringInput.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}
// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(response) {
  if (`${response.license}` === "None") {
    return("")
  } else {;
  return response.badge; 
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
  ${response.license}\n
  Distributed under the ${response.license} See LICENSE.txt for more information`)
}
}

// TODO: Create a function to generate markdown for README
function createMD(response) {
  var markdown =  `# ${response.title}\n

  ## Description
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
To install this app follow the steps below: \n
  ${capitaliseFirstLetter(response.installation)}\n

## Usage \n
Follow the steps below to use this app: \n
  ${capitaliseFirstLetter(response.usage)}\n

## Contributors \n
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated. \n
Current contributors are: \n
  ${response.contributors}\n

## Tests\n
To run test type the following command/s: \n
  ${capitaliseFirstLetter(response.tests)}\n

## Questions\n
Any question, get intouch: \n
  Github: [${response.github}](${response.html_url})\n
  Email: ${response.email}\n
  
${renderLicenseSection(response)}`

/* write file with with Title as name*/
  fs.writeFile(`README-${response.title}.md`, markdown, (err) =>
  err ? console.error(err) : console.log(chalk.greenBright(`Successfully created README-${response.title}.md`)))
 
}

module.exports = createMD;
