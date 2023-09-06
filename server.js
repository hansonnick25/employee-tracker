const inquirer = require('inquirer')
const mysql = require('mysql2')

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db',
  },
  console.log(`Connected to the movies_db database.`)
)

inquirer
  .prompt([
    {
      type: 'list',
      name: 'purpose',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
      ],
    },
  ])
  .then(answers => {
    let sql = ''
    let params = []

    switch (answers.purpose) {
      case 'View all departments':
        sql = 'SELECT * FROM departments'
        db.query(sql, params, (err, rows) => {
          if (err) {
            console.error(err)
          } else {
            console.table(rows, ['id', 'department_name'])
          }
        })
        break

      case 'View all roles':
        sql = 'SELECT * FROM roles'
        db.query(sql, params, (err, rows) => {
          err ? console.error(err) : console.table(rows)
        })
        break

      case 'View all employees':
        sql = 'SELECT * FROM employees'
        db.query(sql, params, (err, rows) => {
          err ? console.error(err) : console.table(rows)
        })
        break

      case 'Add a department':
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'department_name',
              message: 'What is the department name?',
            },
          ])
          .then(answers => {
            params = [answers.department_name]
            sql = 'INSERT INTO departments (department_name) VALUES (?)'
            db.query(sql, params, (err, rows) => {
              err ? console.error(err) : console.table(rows)
            })
          })
        break

      case 'Add a role':
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'role_title',
              message: 'What is the role title?',
            },
            {
              type: 'input',
              name: 'role_salary',
              message: 'What is the role salary?',
            },
            {
              type: 'input',
              name: 'department_id',
              message: 'What is the role department id?',
            },
          ])
          .then(answers => {
            params = [
              answers.role_title,
              answers.role_salary,
              answers.department_id,
            ]
            sql =
              'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)'
            db.query(sql, params, (err, rows) => {
              err ? console.error(err) : console.table(rows)
            })
          })
        break

      case 'Add an employee':
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'first_name',
              message: `What is the employee's first name?`,
            },
            {
              type: 'input',
              name: 'last_name',
              message: `What is the employee's last name?`,
            },
            {
              type: 'input',
              name: 'role_id',
              message: `What is the employee's role id?`,
            },
            {
              type: 'input',
              name: 'manager_id',
              message: `What is the employee's manager id?`,
            },
          ])
          .then(answers => {
            params = [
              answers.first_name,
              answers.last_name,
              answers.role_id,
              answers.manager_id,
            ]
            sql =
              'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)'
            db.query(sql, params, (err, rows) => {
              err ? console.error(err) : console.table(rows)
            })
          })
        break

      case 'Update an employee role':
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'employee_id',
              message: `What is the employee's id?`,
            },
            {
              type: 'input',
              name: 'role_id',
              message: `What is the employee's new role id?`,
            },
          ])
          .then(answers => {
            params = [answers.role_id, answers.employee_id]
            sql = 'UPDATE employees SET role_id = ? WHERE id = ?'
            db.query(sql, params, (err, rows) => {
              err ? console.error(err) : console.table(rows)
            })
          })
        break

      default:
        console.log('Error')
        break
    }
  })
