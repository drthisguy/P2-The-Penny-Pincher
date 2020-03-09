/* Seed with sequelize cli installed..  
 Enter: $ npx sequelize db:seed:all*/

 const bcrypt = require("bcryptjs");

'use strict';

module.exports = {
  //Users
  up: (queryInterface, Sequelize) => {
    const password =  bcrypt.hashSync("example", bcrypt.genSaltSync(10), null);
    return queryInterface.bulkInsert('Users', [{
      email : 'example@example.com',
      password : password,
      createdAt : new Date(),
      updatedAt : new Date()
    }], {}),

  
  //Categories
  queryInterface.bulkInsert('Categories', [
  {
    category : 'Housing',
    createdAt : new Date(),
    updatedAt : new Date(),
  },
  {
    category : 'Insurance',
    createdAt : new Date(),
    updatedAt : new Date(),
  },
  {
    category : 'Transportation',
    createdAt : new Date(),
    updatedAt : new Date(),
  },
  {
    category : 'Telecommunications',
    createdAt : new Date(),
    updatedAt : new Date(),
  },
  {
    category : 'Groceries',
    createdAt : new Date(),
    updatedAt : new Date(),
  },
  {
    category : 'Utilities',
    createdAt : new Date(),
    updatedAt : new Date(),
  },
  {
    category : 'Child Care',
    createdAt : new Date(),
    updatedAt : new Date(),
  },
  {
    category : 'Education',
    createdAt : new Date(),
    updatedAt : new Date(),
  },
  {
    category : 'Medical',
    createdAt : new Date(),
    updatedAt : new Date(),
  },
  {
    category : 'Debt',
    createdAt : new Date(),
    updatedAt : new Date(),
  },
  {
    category : 'Maintenance',
    createdAt : new Date(),
    updatedAt : new Date(),
  },
  {
    category : 'Clothing',
    createdAt : new Date(),
    updatedAt : new Date(),
  },
  {
    category : 'Miscellaneous',
    createdAt : new Date(),
    updatedAt : new Date(),
  },

        ], {}),
  

 
  //Expenses
  
     queryInterface.bulkInsert('Expenses', [
      {
      name : 'Mortgage Pymnt',
      user_id: 1,
      category_id: 1,
      priority: 'High',
      amount: 840.00,
      createdAt : new Date(),
      updatedAt : new Date(),
      },
      {
      name : 'Car Insurance',
      user_id: 1,
      category_id: 2,
      priority: 'High',
      amount: 65.00,
      createdAt : new Date(),
      updatedAt : new Date(),
      },
      {
      name : 'Car Pymnt',
      user_id: 1,
      category_id: 2,
      priority: 'High',
      amount: 65.00,
      createdAt : new Date(),
      updatedAt : new Date(),
      },
      {
      name : 'Gas',
      user_id: 1,
      category_id: 3,
      priority: 'High',
      amount: 33.24,
      createdAt : new Date(),
      updatedAt : new Date(),
      },
      {
      name : 'Cell Phone',
      user_id: 1,
      category_id: 4,
      priority: 'Medium',
      amount: 124.53,
      createdAt : new Date(),
      updatedAt : new Date(),
      },
      {
      name : 'Acme',
      user_id: 1,
      category_id: 5,
      priority: 'Medium',
      amount: 162.58,
      createdAt : new Date(),
      updatedAt : new Date(),
      },
      {
      name : 'Peco',
      user_id: 1,
      category_id: 6,
      priority: 'High',
      amount: 89.17,
      createdAt : new Date(),
      updatedAt : new Date(),
      },
      {
      name : 'Child Support',
      user_id: 1,
      category_id: 7,
      priority: 'High',
      amount: 300.00,
      createdAt : new Date(),
      updatedAt : new Date(),
      },
      {
      name : 'Penn LPS Bootcamp',
      user_id: 1,
      category_id: 8,
      priority: 'High',
      amount: 1400.29,
      createdAt : new Date(),
      updatedAt : new Date(),
      },
      {
      name : 'Doctor Evil',
      user_id: 1,
      category_id: 9,
      priority: 'Low',
      amount: 134.75,
      createdAt : new Date(),
      updatedAt : new Date(),
      },
      {
      name : 'Credit Card Pymnt',
      user_id: 1,
      category_id: 9,
      priority: 'Medium',
      amount: 225.00,
      createdAt : new Date(),
      updatedAt : new Date(),
      },
      {
      name : 'Home Depo',
      user_id: 1,
      category_id: 10,
      priority: 'High',
      amount: 36.91,
      createdAt : new Date(),
      updatedAt : new Date(),
      },
      {
      name : 'Khols',
      user_id: 1,
      category_id: 10,
      priority: 'Low',
      amount: 82.81,
      createdAt : new Date(),
      updatedAt : new Date(),
      },
      {
      name : 'Deck of Cards',
      user_id: 1,
      category_id: 10,
      priority: 'Low',
      amount: 2.49,
      createdAt : new Date(),
      updatedAt : new Date(),
      },
    ],{});
  },
  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Expenses', null, {}),
       queryInterface.bulkDelete('Categories', null, {}),
 
        queryInterface.bulkDelete('Users', [{
          email :'example@example.com'
        }])
      },

  
}