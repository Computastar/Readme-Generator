const inquirer = require('inquirer')
const fs = require('fs');

// TODO: Create an array of questions for user input

const questions = [    
    {
type: 'input',
message: 'Please add your GitHub profile:',
name: 'github'
}
]

// TODO: Create a function to write README file
function init()
{
    inquirer
    .prompt(questions)
    .then((response) => {
        console.log(response)

    })
}



// TODO: Create a function to initialize app

init();