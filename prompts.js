// Here will just export one object of objects for each array of questions
const db = require('./db');
const inquirer = require('inquirer');

//main prompts 

module.exports = {
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
                new inquirer.Separator(),
                'Add employee',
                'Add role',
                'Add department',
                new inquirer.Separator(),
                'Update employee role',
                'Update employee manager',
                new inquirer.Separator(),
                'Fire employee',
                'Outsource role',
                'Downsize. Outsource department',
                'Quit',
                new inquirer.Separator(),
            ]
          }
    ],
    byDep: [
        {
        type: 'list',
        message: 'Which department\'s employees would you like to view?',
        name: 'dep',
        choices: (async() => {
            const arr = [];
            const departments = await db.viewDepartments()
            departments.forEach(dep => {
                arr.push(dep.Departments)
            });
            arr.push("Done");
            return arr;
        })
        }
    ],
    byMan: [
        {
            type: 'list',
            message: 'Which manager\'s employees would you like to view?',
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
            name: "firstName",
            validate: function (value) {
                var pass = value.match(
                    /^[a-z\s]{2,20}$/i
                );
                if (pass) {
                  return true;
                }
                return `Please enter a valid input`;
            },
            filter: function (val) {
                return val.toLowerCase()
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')
                .trim();
              }
        },
        {
            type: 'input',
            message: "Enter last name: ",
            name: "lastName",
            validate: function (value) {
                var pass = value.match(
                    /^[a-z\s]{2,20}$/i
                );
                if (pass) {
                  return true;
                }
                return `Please enter a valid input`;
            },
            filter: function (val) {
                return val.toLowerCase()
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ')
                .trim();
              }
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
        }
    ],
    addRole: [
        {
            type: 'input',
            message: 'Enter new job title: ',
            name: 'title',
            filter: function (val) {
                return val.toLowerCase()
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
              }
        },
        {
            type: 'input',
            message: 'Input salary for this role:',
            name: 'salary',
            validate: function (value) {
                var pass = value.match(
                    // currency optional. comma optional. 
                  /^([£$€]{1})?([0-9]{5,6})([.][0-9]{2})?|([£$€]{1})?[0-9]{2,3}[,][0-9]{3}([.][0-9]{2})?$/
                );
                if (pass) {
                  return true;
                }
          
                return 'Please enter a salary. We do not pay less than 10000.00 for any position.';
              },
              filter: function (value) {
                return value.replace(/([£$€,\s])/g, '')
              }
        },
        {
            type: 'list',
            message: 'Which department is the role assigned?',
            name: 'departmentName',
            choices: (async() => {
                const arr = [];
                const departments = await db.viewDepartments()
                departments.forEach(dep => {
                    arr.push(dep.Departments)
                });
                return arr;
            })
            }
    ],
    addDepartment: [
        {
            type: 'input',
            message: 'Enter new department name: ',
            name: 'name',
            // captalize each word of string
            filter: function (val) {
                return val.toLowerCase()
                .split(' ')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');;
              }
        },
    ],
    updateEmployee: [
        {
            type: 'list',
            message: 'Select employee to modify',
            name: 'chosenEmployee',
            choices: (async() => {
                const arr = [];
                const employees = await db.viewAllEmployees()
                employees.forEach(employee => {
                    arr.push(employee["First Name"].concat(' ', employee["Last Name"])
                    )
                });
                return arr;
            }),
            filter: (async(val) => {
                let response = await db.findEmployeeId(val);
                return response[0].id;
            })
        },
        {
            type: 'list',
            message: 'Select new employee role?',
            name: 'employeeRole',
            choices: (async() => {
                const arr = [];
                const roles = await db.viewRoles()
                roles.forEach(role => {
                    arr.push(role.Role)
                });
                return arr;
            }),
            filter: (async(val) => {
                let response = await db.findRoleId(val);
                return response[0].id;
            })
        },
    ],
    pickDepartment: [
        {
            type: 'list',
            message: 'Which department\'s budget would you like to view?',
            name: 'chosenDepartment',
            choices: (async() => {
                const arr = [];
                const departments = await db.viewDepartments()
                departments.forEach(dep => {
                    arr.push(dep.Departments)
                });
                arr.push("Done");
                return arr;
            })
            }
    ],
    updateManager: [
        {
            type: 'list',
            message: 'Select employee to modify',
            name: 'employeeToUpdate',
            choices: (async() => {
                const arr = [];
                const employees = await db.viewAllEmployees()
                employees.forEach(employee => {
                    arr.push(employee["First Name"].concat(' ', employee["Last Name"])
                    )
                });
                return arr;
            }),
            filter: (async(val) => {
                let response = await db.findEmployeeId(val);
                return response[0].id;
            })
        },
        {
            type: 'list',
            message: 'Who is this employee\'s new manager?',
            name: 'newManager',
            choices: (async() => {
                const arr = [];
                const managers = await db.viewManagers()
                managers.forEach(man => {
                    arr.push(man.Manager)
                });
                arr.push("Remove manager");
                return arr;
            }) ,
            filter: (async(val) => {
                if (val === 'Remove manager') return null;
                let response = await db.findManagerId(val);
                return response[0].id;
            })
        }
    ],
    removeEmployee: [
        {
            type: 'list',
            message: 'Which employee is being fired today?',
            name: 'leavingEmployee',
            choices: (async() => {
                const arr = [];
                const employees = await db.viewAllEmployees()
                employees.forEach(employee => {
                    arr.push(employee["First Name"].concat(' ', employee["Last Name"])
                    )
                });
                return arr;
            }),
            filter: (async(val) => {
                let response = await db.findEmployeeId(val);
                return response[0].id;
            })
        },
    ],
    reassignManager: [
        {
            type: 'list',
            message: 'Who would you like to reassign this team to?',
            name: 'reassign',
            choices: (async() => {
                const arr = [];
                const managers = await db.viewManagers()
                managers.forEach(man => {
                    arr.push(man.Manager)
                });
                return arr;
            }) ,
            filter: (async(val) => {
                let response = await db.findManagerId(val);
                return response[0].id;
            })
        }
    ],
    changeManager: [
        {
            type: 'list',
            message: 'Who is this employee\'s new manager?',
            name: 'newManager',
            choices: (async() => {
                const arr = [];
                const managers = await db.viewManagers()
                managers.forEach(man => {
                    arr.push(man.Manager)
                });
                return arr;
            }) ,
            filter: (async(val) => {
                let response = await db.findManagerId(val);
                return response[0].id;
            }) 
        }
    ],
    removeRole: [
        {
            type: 'list',
            message: 'Which role are you outsourcing? (all employees will be let go.)',
            name: 'outsourcedRole',
            choices: (async() => {
                const arr = [];
                const roles = await db.viewRoles()
                roles.forEach(role => {
                    arr.push(role.Role)
                });
                return arr;
            }),
            filter: (async(val) => {
                let response = await db.findRoleId(val);
                return response[0].id;
            })
        },
    ],
    removeDep: [
        {
            type: 'list',
            message: 'Which department are you outsourcing? (all associated roles and employees will be let go.)',
            name: 'outsourcedDep',
            choices: (async() => {
                const arr = [];
                const deps = await db.viewDepartments()
                deps.forEach(dep => {
                    arr.push(dep.Departments)
                });
                return arr;
            }),
            filter: (async(val) => {
                let response = await db.findDepartmentId(val);
                return response[0].id;
            })
        },
    ]
}
