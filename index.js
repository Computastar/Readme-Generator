const inquirer = require('inquirer')
const fs = require('fs');
const path = require('path');
const axios = require('axios');
var githubData //= {};
var response = {};
var userFirstName;
var newProject = false;

const getUserProfile = async () => 
    {
        const q1 = await inquirer.prompt([
        {
        type: 'input',
        message: 'What is your github username?',
        name: 'github',
        loop: true
        }
        ])


console.log(q1.github)

        console.log("\n")
        console.log("OK let me get the details for: " + q1.github)
        //await new Promise(resolve => setTimeout(resolve, 5000));

        githubData =  await axios.get(`https://api.github.com/users/${q1.github}`,{ headers: {'Authorization': 'token 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'}})
        
        console.log(githubData.data)
        if (githubData.status != "200") {
            console.log("We cant find that github profile, please try again or press ctrl +c to quit.")
            return false
        }
        userFirstName  = githubData.data.name.split(' ');
        userFirstName = userFirstName[0]
        response.firstName= userFirstName;

        response.github = githubData.data.login;
        getEmailDetails(githubData)
        return githubData;
      
    
    }


function getUserFirstName(githubData){
    getUserFirstName  = githubData.data.name.split(' ');
    return getUserFirstName[0]
}

async function getProjectTitle() {
    userFirstName //= getUserFirstName(githubData)
    console.log(response.firstName + response.github + response.email)

    const result = ['Enter a new project'];

    console.log(githubData.data.repos_url)

    const githubRepos = await axios.get(githubData.data.repos_url,{ headers: {'Authorization': 'token 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'}})
console.log(githubRepos)

for (let element of githubRepos.data)
{
    result.push(element.name)
}
console.log(result)
    const q3 = await inquirer.prompt([
    {
        type: 'list',
        message: `Ok ${userFirstName}, We found the following repos in GitHub, Select one or choose 'Enter a new project'?`,
        name: 'title',
        choices: result
        //validate: confirmInput
        }
    ])

    if (q3.title === 'Enter a new project')
        {
            const q3 = await inquirer.prompt([
                {
                    type: 'input',
                    message: `Ok ${userFirstName}, Enter a new project title'?`,
                    name: 'title',
                    //validate: confirmInput
                    }
                ])
                response.title = q3.title
                newProject = true;
                getProjectDescription();
                return response.title
        }

    response.title = q3.title
    getProjectDescription();
    return response.title
}

async function getProjectDescription() {
    console.log(newProject)
    console.log(response.firstName + response.github + response.email + response.title)
    const q4 = await inquirer.prompt([
    {
        type: 'input',
        message: `ok ${userFirstName} Lets add a description of the project ${response.title}?`,
        name: 'description',
        //validate: confirmInput
        }
    ])
    response.description = q4.description
    getProjectInstallation(0)
    return response.description
}


async function getProjectInstallation() {
    
    console.log(response.firstName + response.github + response.email + response.title + response.description)
    const q5 = await inquirer.prompt([
    {
        type: 'input',
        message: `ok ${userFirstName} Lets add installation instructions for the project ${response.title}?`,
        name: 'installation',
        //validate: confirmInput
        }
    ])
    response.installation = q5.installation
    getProjectUsage();
    return response.installation
}

async function getProjectUsage() {
    
    console.log(response.firstName + response.github + response.email + response.title + response.description + response.installation)
    const q6 = await inquirer.prompt([
    {
        type: 'input',
        message: `ok ${userFirstName} Lets add usage details for the project ${response.title}?`,
        name: 'usuage',
        //validate: confirmInput
        }
    ])
    response.usage = q6.usage
    getGitHubLicenses();
    return response.usage
}

async function getGitHubLicenses() {

    var result= ['None'];

    const githubLicenses = await axios.get(`https://api.github.com/licenses`,{ headers: {'Authorization': 'token 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', 'Hidden' : 'false'}})


    for (let element of githubLicenses.data)
    {
        result.push(element.name)
    }
    
const q7 = await inquirer.prompt([
    {
        type: 'rawlist',
        message: `ok ${userFirstName} What is the license do you want to use for the project ${response.title}?`,
        name: 'license',
        choices : result
        //validate: confirmInput
        }
    ])
    response.license = q7.choices
    getProjectContributors();
    return response.license
}


async function getProjectContributors() {

    console.log(response.firstName + response.github + response.email)
let result = [];

   if (newProject === true) {
    const q8 = await inquirer.prompt([
        {
            type: 'input',
            message: `Ok ${userFirstName} Who has contributored to the project ${response.title}?`,
            name: 'contributors',
            //validate: confirmInput
            }
        ])
        response.usage = q8.usage
        //getGitHubLicenses();
        return response.usage
   }

    console.log("Lets see if we can the contributors to ${response.title}")

   const githubContributors = await axios.get(`https://api.github.com/repos/${response.github}/${response.title}/contributors`,{ headers: {'Authorization': 'token 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'}})
console.log(githubContributors)

    if (githubContributors.status === 200)
    {

for (let element of githubContributors.data)
{
    result.push(element.login)
}
console.log(result)
    const q8 = await inquirer.prompt([
    {
        type: 'checkbox',
        message: `Ok ${userFirstName}, We found the following contributors for ${response.title} in GitHub`,
        name: 'title',
        choices: result
        //validate: confirmInput
        }
    ])
    response.contributors = q8.result
    return response.contributors
    }
    else {
      {
        const q8 = await inquirer.prompt([
            {
                type: 'input',
                message: `Ok ${userFirstName} Who has contributored to the project ${response.title}?`,
                name: 'contributors',
                //validate: confirmInput
                }
            ])
            response.contributors = q8.contributors
            getProjectTests();
            return response.contributors
        }

    }
}


async function getProjectTests() {

    const q9 = await inquirer.prompt([
    {
        type: 'input',
        message: `ok ${userFirstName} Lets add some tests of the project ${response.title}?`,
        name: 'tests',
        //validate: confirmInput
        }
    ])
    response.tests = q9.tests
    return response.tests
}

async function getEmailDetails (githubData) 
{
    if (githubData.data.email === null ) {
        console.log("Looks like your email address is't part of your github profile.")

        const q2 = await inquirer.prompt([
            {
                type: 'input',
                message: 'Please add your email:',
                name: 'email',

                // validate: confirmInput
                }
            ])
            response.email = q2.email;
            getProjectTitle();
            return q2.email;
    }
    else {
    const q2 = await inquirer.prompt([
        {
            type: 'confirm',
            message: `We found this email from your github proflie, ${githubData.data.email} is it correct:`,
            name: 'email',
            default: githubData.data.email
            // validate: confirmInput
            }
        ])
      
        response.email = githubData.data.email;
        getProjectTitle();
        return q2.email;
    }
}



// TODO: Create a function to write README file
function init() {

         // console.log(githubData.data)
          //console.log(getUserFirstName(githubData))
      
    
      //console.log(response)
     response = getUserProfile();
   
    //console.log(response.data)
   //response =  getEmailDetails(githubData);
   // response = response + getProjectTitle();
   } 





// TODO: Create a function to initialize app
init();
// console.log("hello")