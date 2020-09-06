// here is my main js central command
// import inquirer, asciiart, prompts, db (this grabs the index.js from db dir), console.table
const inquirer = require('inquirer');
const { byDepartmentPrompt, byManagerPrompt, prompts} = require('./prompts');
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


async function viewByDepartment() {
    let department = await byDepartmentPrompt(); 
    const employees = await db.viewByDepartment(department)

    if (department === "done") {
        mainPrompt();
    } else if (employees.length === 0) {
        console.log(`There are no employees in ${department}.\n`);
        viewByDepartment();
    } else {
        console.log('\n');
        console.table(employees);
        viewByDepartment();
    } 
}

async function viewByManager() {
    let manager = await byManagerPrompt(); 
    const employees = await db.viewByManager(manager)

    if (manager === "done") {
        mainPrompt();
    } else if (employees.length === 0) {
        console.log(`${manager} manages no employees.\n`);
        viewByManager();
    } else {
        console.log('\n');
        console.table(employees);
        viewByManager();
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
            viewByDepartment();
            break;
        case 'View employees of a specific manager':
            viewByManager();
            break;
        default:
            console.log('Goodbye!')
            break;
    }
}


async function init() {

}

mainPrompt();