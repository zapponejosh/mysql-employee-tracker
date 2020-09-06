// Here will just export one object of objects for each array of questions
const db = require('./db');
const inquirer = require('inquirer');

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
                'View department budget',
                'Add employee',
                'Add role',
                'Add department',
                'Update employee role',
                'Update employee manager',
                'Fire employee',
                'Outsource department',
                'Retire role',
                'Quit'
            ]
          }
    ],
    byDep: [
        {
        type: 'list',
        message: 'Which departments employee\'s would you like to view?',
        name: 'dep',
        choices: (async() => {
            const arr = [];
            const departments = await db.viewDepartments()
            departments.forEach(dep => {
                arr.push(dep.Departments)
            });
            arr.push("done");
            return arr;
        })
        }
    ],
    byMan: [
        {
            type: 'list',
            message: 'Which departments employee\'s would you like to view?',
            name: 'man',
            choices: (async() => {
                const arr = [];
                const managers = await db.viewManagers()
                managers.forEach(man => {
                    arr.push(man.Manager)
                });
                arr.push("done");
                return arr;
            }) 
        }
    ],
    addEmployee: [
        {
            type: 'input',
            message: "Enter first name: ",
            name: "firstName"
        },
        {
            type: 'input',
            message: "Enter last name: ",
            name: "lastName"
        },
        {
            type: 'list',
            message: 'What is this employee\'s role?',
            name: 'role',
            choices: (async() => {
                const arr = [];
                const roles = await db.viewRoles()
                roles.forEach(role => {
                    arr.push(role.Role)
                });
                return arr;
            }) 
        },
        {
            type: 'list',
            message: 'Who is this employee\'s manager?',
            name: 'manager',
            choices: (async() => {
                const arr = [];
                const managers = await db.viewManagers()
                managers.forEach(man => {
                    arr.push(man.Manager)
                });
                arr.push('This is a new manager')
                return arr;
            }) 
        },
    ]
    
}

module.exports = { prompts}