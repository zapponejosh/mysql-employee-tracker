// here is my main js central command
// import inquirer, asciiart, prompts, db (this grabs the index.js from db dir), console.table
const inquirer = require('inquirer');
const figlet = require('figlet');
const prompts = require('./prompts');
const db = require('./db');
require('console.table');

function createTitle(text) {
  return new Promise((resolve, reject) => {
    figlet.text(
      text,
      {
        font: 'alligator',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 120,
        whitespaceBreak: true,
      },
      (err, data) => {
        if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          reject(err);
          return;
        }
        console.log(data);

        resolve();
      },
    );
  });
}

async function viewAllEmployees() {
  const employees = await db.viewAllEmployees();
  console.log('\n');
  console.table(employees);
}

async function viewDepartments() {
  const departments = await db.viewDepartments();
  console.log('\n');
  console.table(departments);
}

async function viewRoles() {
  const roles = await db.viewRoles();
  console.log('\n');
  console.table(roles);
}

async function viewByDepartment(department) {
  // let department = await byDepartmentPrompt();
  const employees = await db.viewByDepartment(department);

  if (department === 'Done') {
    console.log('Ok\n');
  } else if (employees.length === 0) {
    console.log(`There are no employees in ${department}.\n`);
    const { dep } = await inquirer.prompt(prompts.byDep);
    await viewByDepartment(dep);
  } else {
    console.log('\n');
    console.table(employees);
    const { dep } = await inquirer.prompt(prompts.byDep);
    await viewByDepartment(dep);
  }
}

async function viewByManager(manager) {
  const employees = await db.viewByManager(manager);
  console.log(manager);
  if (manager === 'Done') {
    console.log('Ok\n');
  } else if (employees.length === 0) {
    console.log(`${manager} manages no employees.\n`);
    const { man } = await inquirer.prompt(prompts.byMan);
    await viewByManager(man);
  } else {
    console.log('\n');
    console.table(employees);
    const { man } = await inquirer.prompt(prompts.byMan);
    await viewByManager(man);
  }
}

async function createEmployee(newEmployee) {
  const details = Object.values(newEmployee).filter((val) => val !== 'This is a new manager');
  // change manager name for ID
  if (details.length === 4) {
    const managerId = await db.findManagerId(details[3]);
    details[3] = managerId[0].id;
  }
  // change role title to role ID
  const roleId = await db.findRoleId(details[2]);
  details[2] = roleId[0].id;
  await db.addEmployee(details);
}

async function createRole(newRole) {
  const details = Object.values(newRole);
  const depId = await db.findDepartmentId(details[2]);
  details[2] = depId[0].id;

  await db.addRole(details);
}

async function createDepartment(newDepartment) {
  await db.addDepartment(newDepartment);
}

async function calculateBudget(department) {
  if (department === 'Done') {
    return;
  }
  const response = await db.viewByDepartment(department);
  const budget = response.reduce((val, employee) => val += parseFloat(employee.Salary), 0);
  console.log(`\n${department} budget is $${budget.toFixed(2)}\n`);
  const { chosenDepartment } = await inquirer.prompt(prompts.pickDepartment);
  await calculateBudget(chosenDepartment);
}

async function updateManager(employeeId, managerId) {
  await db.queryUpdateManager(employeeId, managerId);
}

async function updateEmployeeRole(chosenEmployee, employeeRole) {
  const subs = await db.getSubIds(chosenEmployee);
  if (subs.length !== 0) {
    console.log('You cannot remove this manager without reassigning their team');
    const team = await db.viewByManager(chosenEmployee);
    console.table(team);

    const { reassign } = await inquirer.prompt(prompts.reassignManager);
    subs.forEach((empId) => {
      updateManager(empId.id, reassign);
    });
    const { newManager } = await inquirer.prompt(prompts.changeManager);
    console.log(newManager);
    updateManager(chosenEmployee, newManager);
  }
  await db.updateRole(chosenEmployee, employeeRole);
}

async function fireEmployee(id) {
  try {
    await db.queryRemoveEmployee(id);
    console.log('\nEmployee has been removed.\n');
    return;
  } catch (error) {
    console.log('You cannot delete this employee without reassigning their team');
    const team = await db.viewByManager(id);
    console.table(team);
    const teamIds = team.reduce((newArray, employee) => newArray.concat(employee.id), []);
    const { reassign } = await inquirer.prompt(prompts.reassignManager);
    console.log(reassign);
    teamIds.forEach((empId) => {
      updateManager(empId, reassign);
    });
    await fireEmployee(id);
  }
}

async function mainPrompt() {
  const { choice } = await inquirer.prompt(prompts.mainPrompt);
  switch (choice) {
    case 'View all employees':
      await viewAllEmployees();
      await mainPrompt();
      break;
    case 'View all roles':
      await viewRoles();
      await mainPrompt();
      break;
    case 'View all departments':
      await viewDepartments();
      await mainPrompt();
      break;
    case 'View employees of a specific department':
      const { dep } = await inquirer.prompt(prompts.byDep);
      await viewByDepartment(dep);
      await mainPrompt();
      break;
    case 'View employees of a specific manager':
      const { man } = await inquirer.prompt(prompts.byMan);
      await viewByManager(man);
      await mainPrompt();
      break;
    case 'Add employee':
      const newEmployee = await inquirer.prompt(prompts.addEmployee);
      await createEmployee(newEmployee);
      await mainPrompt();
      break;
    case 'Add role':
      const newRole = await inquirer.prompt(prompts.addRole);
      await createRole(newRole);
      await mainPrompt();
      break;
    case 'Add department':
      const { name } = await inquirer.prompt(prompts.addDepartment);
      await createDepartment(name);
      await mainPrompt();
      break;
    case 'Update employee role':
      const { chosenEmployee, employeeRole } = await inquirer.prompt(prompts.updateEmployee);
      await updateEmployeeRole(chosenEmployee, employeeRole);
      await mainPrompt();
      break;
    case 'View department budget':
      const { chosenDepartment } = await inquirer.prompt(prompts.pickDepartment);
      await calculateBudget(chosenDepartment);
      await mainPrompt();
      break;
    case 'Update employee manager':
      const { employeeToUpdate, newManager } = await inquirer.prompt(prompts.updateManager);
      await updateManager(employeeToUpdate, newManager);
      await mainPrompt();
      break;
    case 'Fire employee':
      const { leavingEmployee } = await inquirer.prompt(prompts.removeEmployee);
      await fireEmployee(leavingEmployee);
      await mainPrompt();
      break;
    case 'Outsource role':
      const { outsourcedRole } = await inquirer.prompt(prompts.removeRole);
      await db.queryRemoveRole(outsourcedRole);
      await mainPrompt();
      break;
    case 'Downsize. Outsource department':
      const { outsourcedDep } = await inquirer.prompt(prompts.removeDep);
      await db.queryRemoveDep(outsourcedDep);
      await mainPrompt();
      break;
    default:
      createTitle('Goodbye!');
      process.exit();
  }
}

async function init() {
  await createTitle('THE OFFICE');
  console.log('\nEMPLOYEE -- MANAGEMENT -- SYSTEM\n\n');

  await mainPrompt();
}

init();
