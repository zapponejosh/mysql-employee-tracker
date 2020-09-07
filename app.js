// here is my main js central command
// import inquirer, asciiart, prompts, db (this grabs the index.js from db dir), console.table
const inquirer = require('inquirer');
const prompts = require('./prompts');
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

async function createEmployee(newEmployee) {
    let details = Object.values(newEmployee).filter(val => val !== 'This is a new manager');
    //change manager name for ID
    if (details.length === 4) {
        managerId = await db.findManagerId(details[3]);
        details[3] = managerId[0].id;
    }
    // change role title to role ID
    let roleId = await db.findRoleId(details[2]);
    details[2] = roleId[0].id;
    await db.addEmployee(details);
    mainPrompt();
}

async function createRole(newRole) {
    let details = Object.values(newRole)
    console.log(details);
    let depId = await db.findDepartmentId(details[2]);
    details[2] = depId[0].id;
    console.log(depId)
    console.log(details)
    await db.addRole(details);
    mainPrompt();
}

async function createDepartment(newDepartment) {
    await db.addDepartment(newDepartment);
    mainPrompt();
}

// TODO if moving out of managerial role they must reassign team to another manager or just not allow removing from management without moving team first
async function updateEmployeeRole(chosenEmployee, employeeRole) {
    let subs = await db.getSubIds(chosenEmployee)
    console.log(subs)
    if (subs.length !== 0) {
        console.log("You cannot remove this manager without reassigning their team")
        let team = await db.viewByManager(chosenEmployee)
        console.table(team)
        
        const { reassign } = await inquirer.prompt(prompts.reassignManager)
        subs.forEach(empId => {
            updateManager(empId.id, reassign);
        });
        const {newManager} = await inquirer.prompt(prompts.changeManager);
        console.log(newManager)
        updateManager(chosenEmployee, newManager)
    }
    await db.updateRole(chosenEmployee, employeeRole)
    mainPrompt();
}

async function calculateBudget(department) {
    let response = await db.viewByDepartment(department);
    let budget = response.reduce((val, employee) => {
        return val += parseFloat(employee.Salary)
    }, 0)
    console.log(`\n${department} budget is $${budget}\n`);
    mainPrompt();
}

async function updateManager(employeeId, managerId) {
    await db.queryUpdateManager(employeeId, managerId)
    // mainPrompt();
}

async function fireEmployee(id) {
    try {
        await db.queryRemoveEmployee(id)
    } catch (error) {
        console.log(error)
        console.log("You cannot delete this employee without reassigning their team")
        let team = await db.viewByManager(id)
        console.table(team)
        let teamIds = team.reduce((newArray, employee)=> {
            return newArray.concat(employee.id)
        }, [])
        console.log(teamIds)
        const { reassign } = await inquirer.prompt(prompts.reassignManager)
        console.log(reassign)
        teamIds.forEach(empId => {
            updateManager(empId, reassign);
        });
        fireEmployee(id);
    }
    mainPrompt();
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
        case 'Add employee':
            const newEmployee = await inquirer.prompt(prompts.addEmployee);
            createEmployee(newEmployee)
            break;
        case 'Add role':
            const newRole = await inquirer.prompt(prompts.addRole);
            createRole(newRole);
            break;
        case 'Add department':
            const {name} = await inquirer.prompt(prompts.addDepartment);
            createDepartment(name);
            break;
        case 'Update employee role':
            const {chosenEmployee, employeeRole} = await inquirer.prompt(prompts.updateEmployee);
            updateEmployeeRole(chosenEmployee, employeeRole);
            break;
        case 'View department budget':
            const { chosenDepartment } = await inquirer.prompt(prompts.pickDepartment);
            calculateBudget(chosenDepartment);
            break;
        case 'Update employee manager': 
            const {employeeToUpdate, newManager} = await inquirer.prompt(prompts.updateManager);
            await updateManager(employeeToUpdate, newManager);
            mainPrompt();
            break;
        case 'Fire employee': 
            const { leavingEmployee } = await inquirer.prompt(prompts.removeEmployee)
            fireEmployee(leavingEmployee);
            default:
            console.log('Goodbye!')
            break;
    }
}


async function init() {

}

mainPrompt();
