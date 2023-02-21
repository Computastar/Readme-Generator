const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");
const axios = require("axios");
const createMD = require('./assests/modules/createMD');

var logFormatY = chalk.yellowBright;
var logFormatR = chalk.redBright;
var githubData = {};
var response = {};
var userFirstName;
var newProject = false;




/* function to call GitHub Api to get github profile details from inputted string */
const getUserProfile = async () => {
  const q1 = await inquirer.prompt([
    {
      type: "input",
      message: logFormatY("What is your github username?"),
      name: "github",
      loop: true,
    },
  ]);

  if (q1.github === "") {
    console.log(logFormatR("We'll try that again shall we?"))
    return getUserProfile();
  }

  console.log(logFormatY("OK let me get the details for: " + q1.github));
  
  githubData = await axios.get(`https://api.github.com/users/${q1.github}`,{ headers: {'Authorization': 'token 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'}})
  .catch(function (error) {
    if (error.response.data.message === 'Not Found') {
    console.log(logFormatR
      ("We cant find that github profile, please try again or press ctrl + c to quit.")
    );
    return getUserProfile();
  }

})
  userFirstName = githubData.data.name.split(" ");
  userFirstName = userFirstName[0];
  response.firstName = userFirstName;

  response.github = githubData.data.login;
  response.html_url = githubData.data.html_url;
  getEmailDetails(githubData);
  return githubData;
};

/* function returns email from github profile if present if not prompt for email */
async function getEmailDetails(githubData) {
  if (githubData.data.email === null) {
    console.log(logFormatY(
      "Looks like your email address isn't part of your github profile.")
    );

    const q2 = await inquirer.prompt([
      {
        type: "input",
        message: logFormatR("Please add your email:"),
        name: "email",
      },
    ]);
    response.email = q2.email;
    getProjectTitle();
    return q2.email;
  } else {
    const q2 = await inquirer.prompt([
      {
        type: "confirm",
        message: logFormatY(`We found this email from your github profile,` + logFormatR(`${githubData.data.email}`) + ` is it correct:`),
        name: "email",
        default: githubData.data.email,
        // validate: confirmInput
      },
    ]);

    if (q2)
    {
      response.email = githubData.data.email;
      getProjectTitle();
      return q2.email;
    }
    else{
    const q2 = await inquirer.prompt([
      {
        type: "input",
        message: logFormatR("Please add your email:"),
        name: "email",
      },
    ]);
    response.email = q2.email;
    getProjectTitle();
    return q2.email;
  }
  }
}

/* function calls GitHub api to get users repos, present them as list to select, or
   'Enter a new project ' to create a new project title */
async function getProjectTitle() {
 
  console.log(response.firstName + response.github + response.email);

  const result = ["Enter a new project"];

  //console.log(githubData.data.repos_url);

  const githubRepos = await axios.get(githubData.data.repos_url, {
    headers: {
      Authorization: "token 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",
    },
  });
  //console.log(githubRepos);

  for (let element of githubRepos.data) {
    result.push(element.name);
  }
  //console.log(result);
  const q3 = await inquirer.prompt([
    {
      type: "list",
      message: logFormatY(`Ok ${userFirstName}, We found the following repos in GitHub, Select one or choose 'Enter a new project'?`),
      name: "title",
      choices: result,
      //validate: confirmInput
    },
  ]);

  if (q3.title === "Enter a new project") {
    const q3 = await inquirer.prompt([
      {
        type: "input",
        message: logFormatY(`Ok ${userFirstName}, Enter a new project title'?`),
        name: "title",
        //validate: confirmInput
      },
    ]);
    response.title = q3.title;
    newProject = true;
    getProjectDescription();
    return response.title;
  }

  response.title = q3.title;
  getProjectDescription();
  return response.title;
}

/* function to capturce project description */
async function getProjectDescription() {
  const q4 = await inquirer.prompt([
    {
      type: "input",
      message: logFormatY(`Ok ${userFirstName}, Lets add a description of the project ${response.title}?`),
      name: "description",
      //validate: confirmInput
    },
  ]);
  response.description = q4.description;
  getProjectInstallation(0);
  return response.description;
}

/* function to capture project install details */
async function getProjectInstallation() {
  const q5 = await inquirer.prompt([
    {
      type: "input",
      message: logFormatY(`Ok ${userFirstName}, Lets add installation instructions for the project ${response.title}?`),
      name: "installation",
      //validate: confirmInput
    },
  ]);
  response.installation = q5.installation;
  getProjectUsage();
  return response.installation;
}

/* function to capture project usage */
async function getProjectUsage() {
  const q6 = await inquirer.prompt([
    {
      type: "input",
      message: logFormatY(`Ok ${userFirstName}, Lets add usage details for the project ${response.title}?`),
      name: "usage",
      //validate: confirmInput
    },
  ]);
  response.usage = q6.usage;
  getGitHubLicenses();
  return response.usage;
}

/* function to return GitHub License type. Calls GitHub Api to return licenses options*/
async function getGitHubLicenses() {
  var result = ["None"];

  const githubLicenses = await axios.get(`https://api.github.com/licenses`, {
    headers: {
      Authorization: "token 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",
      Hidden: "false",
    },
  });

  for (let element of githubLicenses.data) {
    result.push(element.name);
  }

  const q7 = await inquirer.prompt([
    {
      type: "rawlist",
      message: logFormatY(`Ok ${userFirstName}, What is the license do you want to use for the project ${response.title}?`),
      name: "license",
      choices: result,
      //validate: confirmInput
    },
  ]);
  response.license = q7.license;
  getProjectContributors();
  return response.license;
}

/* function to capture project contributors, Calls GitHub Api to check the repo selected in title.
   Gets newProject variable, if true then just present normal input, otherwise present checkbox with 
   contributors */
async function getProjectContributors() {
  let result = [];

  if (newProject === true) {
    const q8 = await inquirer.prompt([
      {
        type: "input",
        message: logFormatY(`Ok ${userFirstName}, Who has contributored to the project ${response.title}?`),
        name: "contributors",
        //validate: confirmInput
      },
    ]);
    response.contributors = q8.contributors;
    getProjectTests();
    return response.usage;
  }

  console.log(logFormatY(`Lets see if we can the contributors to ${response.title}`));

  const githubContributors = await axios.get(
    `https://api.github.com/repos/${response.github}/${response.title}/contributors`,
    {
      headers: {
        Authorization: "token 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",
      },
    }
  );
  //console.log(githubContributors);

  if (githubContributors.status === 200) {
    for (let element of githubContributors.data) {
      result.push(element.login);
    }
    //console.log(result);
    const q8 = await inquirer.prompt([
      {
        type: "checkbox",
        message: logFormatY(`Ok ${userFirstName}, We found the following contributors for ${response.title} in GitHub`),
        name: "contributors",
        choices: result,
        //validate: confirmInput
      },
    ]);
    response.contributors = q8.contributors;
    getProjectTests();
    return response.contributors;
  } else {
    {
      const q8 = await inquirer.prompt([
        {
          type: "input",
          message: logFormatY(`Ok ${userFirstName}, Who has contributored to the project ${response.title}?`),
          name: "contributors",
          //validate: confirmInput
        },
      ]);
      response.contributors = q8.contributors;
      getProjectTests();
      return response.contributors;
    }
  }
}

/* function to capture project tests input */
async function getProjectTests() {
  const q9 = await inquirer.prompt([
    {
      type: "input",
      message: logFormatY(`Ok ${userFirstName}, Lets add some tests of the project ${response.title}?`),
      name: "tests",
      //validate: confirmInput
    },
  ]);
  response.tests = q9.tests;
  //console.log(response)
  createMD(response)
  return response.tests;
}

// TODO: Create a function to write README file
function init() {
  clear();
  console.log(chalk.magentaBright(figlet.textSync('Readme Generator', {horizontalLayout: "full"})));
  response = getUserProfile();
}

// TODO: Create a function to initialize app
init();

