// Here will just export one object of objects for each array of questions
const db = require('./db');
const inquirer = require('inquirer');

// special cases to dynamilcally generate choices for certain queries
// by Department
async function getDepartments() {
    const arr = [];
    const departments = await db.viewDepartments()
    departments.forEach(dep => {
        arr.push(dep.Departments)
    });
    return arr;
}

async function byDepartmentPrompt() {
    const depList = await getDepartments();
    const { result } = await inquirer.prompt({
        type: 'list',
        message: 'Which departments employee\'s would you like to view?',
        name: 'result',
        choices: [...depList, "done"]
    });
    return result;
}

// by manager 
async function getManagers() {
    const arr = [];
    const managers = await db.viewManagers()
    managers.forEach(dep => {
        arr.push(dep.Manager)
    });
    return arr;
}

async function byManagerPrompt() {
    const depList = await getManagers();
    const { result } = await inquirer.prompt({
        type: 'list',
        message: 'Which manager\'s employees would you like to view?',
        name: 'result',
        choices: [...depList, "done"]
    });
    return result;
}


//main prompts 

const prompts = {
    //here are all the questions
    mainPrompt: [
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all roles',
                'View all departments',
                'View employees of a specific department',
                'View employees of a specific manager',
                'Quit',
            ]
          }
    ],
    
}

module.exports = { byDepartmentPrompt, byManagerPrompt, prompts}