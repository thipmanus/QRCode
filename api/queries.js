const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ticket',
  host: '192.168.26.19',
  database: 'alist',
  password: 'abc123',
  port: 5432,
})

pool.connect(function(error){
  if(!error){
    console.log('Connection Successful');
  } else {
    console.log('Failed to connect..', error)
  }
})

// const getUsers = (request, response) => {
//   pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows)
//   })
// }
/*
const getUserById = (request, response) => {
   const id = parseInt(request.params.id)

   pool.query('SELECT * FROM users WHERE "MEMBERCODE" = $1', [id], (error, results) => {
     if (error) {
       throw error
     }
     response.status(200).json(results.rows)
   })
 }
*/
// const createUser = (request, response) => {
//   const { name, email } = request.body

//   pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(201).send(`User added with ID: ${result.insertId}`)
//   })
// }

// const updateUser = (request, response) => {
//   const id = parseInt(request.params.id)
//   const { name, email } = request.body

//   pool.query(
//     'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//     [name, email, id],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`User modified with ID: ${id}`)
//     }
//   )
// }

// const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id)

//   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`User deleted with ID: ${id}`)
//   })
// }

// module.exports = {
//   getUsers,
//   getUserById,
//   createUser,
//   updateUser,
//   deleteUser,
// }