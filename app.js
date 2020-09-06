// here is my main js central command
// import inquirer, asciiart, prompts, db (this grabs the index.js from db dir), console.table
const inquirer = require('inquirer');
const {prompts} = require('./prompts');
const db = require('./db');
require('console.table')

// create a main init function and several async functions for each method

async function viewAllEmployees() {
    const employees = await db.viewAllEmployees()
    console.log('\n');
    console.table(employees);
    mainPrompt();
}

async function viewDepartments() {
    const departments = await db.viewDepartments()
    console.log('\n');
    console.table(departments);
    mainPrompt();
}

async function viewRoles() {
    const roles = await db.viewRoles()
    console.log('\n');
    console.table(roles);
    mainPrompt();
}


async function viewByDepartment(department) {
    // let department = await byDepartmentPrompt(); 
    const employees = await db.viewByDepartment(department)

    if (department === "done") {
        mainPrompt();
    } else if (employees.length === 0) {
        console.log(`There are no employees in ${department}.\n`);
        const { dep } = await inquirer.prompt(prompts.byDep);
        viewByDepartment(dep);
    } else {
        console.log('\n');
        console.table(employees);
        const { dep } = await inquirer.prompt(prompts.byDep);
        viewByDepartment(dep);
    } 
}

async function viewByManager(manager) {
    const employees = await db.viewByManager(manager)
    console.log(manager)
    if (manager === "done") {
        mainPrompt();
    } else if (employees.length === 0) {
        console.log(`${manager} manages no employees.\n`);
        const { man } = await inquirer.prompt(prompts.byMan);
        viewByManager(man);
    } else {
        console.log('\n');
        console.table(employees);
        const { man } = await inquirer.prompt(prompts.byMan);
        viewByManager(man);
    } 
}


async function mainPrompt() {
    const { choice} = await inquirer.prompt(prompts.mainPrompt);
    switch(choice) {
        case 'View all employees':
            viewAllEmployees();
            break;
        case 'View all roles':
            viewRoles();
            break;
        case 'View all departments':
            viewDepartments();
            break;
        case 'View employees of a specific department':
            const { dep } = await inquirer.prompt(prompts.byDep);
            viewByDepartment(dep);
            break;
        case 'View employees of a specific manager':
            const { man } = await inquirer.prompt(prompts.byMan);
            viewByManager(man);
            break;
        default:
            console.log('Goodbye!')
            break;
    }
}


async function init() {

}

mainPrompt();