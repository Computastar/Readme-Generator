# Readme-Generator
App to generate a README 

  ## Description
  This App Will Generate a Professional README For Your Next Project. Follow The Prompts And Enter All Required Information. This app uses the GitHub Api to retrive     details given the users GitHub login. It will attempt to get the users email address in the profile, if none is avavilable then it will prompt. It will then return a   list of repos from GitHub, you can select one of those or enter a new Project name. You then follow the prompts to enter a description, installation instructions and usage details. The app will then present a list of licenses availbe in GitHub. I created my own API as the data returned from GitHub didnt return the correct information to get the badge data, as I created a API hosted https://my-json-server.typicode.com/computastar/badges-api-server/db which returns all the required data. The next prompt asks about Contributors, the app returns the contritutors if you selected a repo, select the contributors using the spacebar. If its a new Project enter your own Contributors. Enter the tests ytou require. The app will now build out the ReadMe, name README-%ProjectTitle%.md in the same folder as index.js

  <img src="https://img.shields.io/badge/License-MIT_License-blue.svg">

## Table of Contents 

* [Installation](#installation) 

* [Usage](#usage) 

* [Contributors](#contributors) 

* [Tests](#tests) 

* [Questions](#questions) 

* [License](#license)

* [Video](#video)
 


## Installation 

To install this app follow the steps below: 

  1. Git Clone [repo] - To Clone Repository.
  2. Npm Install - To Download Dependencies.
  3. Follow this link to aquire a GitHub personal Classic Token: 
  https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
  4. Update the config.json file in ./assets/modules with the token.
  5. node index.js at the terminal command line.


## Usage 

Follow the steps below to use this app: 

  * Node Index.js 
  * Follow The Prompts 
  * Enter Required Info 
  * Check Folder For README

## Contributors 

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated. 

Current contributors are: 

  Computastar


## Tests

To run test type the following command/s: 

  Npm Test


## Questions

Any question, get intouch: 

  Github: [Computastar](https://github.com/Computastar)

  Email: jason.hunter@computastar.com

  
## License

  MIT License

  Distributed under the MIT License See LICENSE.txt for more information
  
## Video

Follow link to video demo: [ReadMe Generator Video](https://drive.google.com/file/d/12v2g_dt-fZJb3XFU9TFiRvbJ7Wl19LCT/preview)
