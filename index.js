// const inquirer = require('inquirer');

// async function askLogo() {
//     try {
//         const data = await inquirer.prompt([
//             {
//                 type: 'input',
//                 name: 'text',
//                 message: 'Enter no more than three characters for your logo',
//                 validate: letterLength
//             },
//             {
//                 type: 'list',
//                 name: 'color1',
//                 message: 'Which color would you prefer for the text?',
//                 choices: ['white', 'black', 'green'],
//             },
//             {
//                 type: 'list',
//                 name: 'shape',
//                 message: 'Would you like to choose a circle, triangle, or square?',
//                 choices: ['circle', 'triangle', 'square'],
//             },
//             {
//                 type: 'list',
//                 name: 'color2',
//                 message: 'Which color would you prefer for the shape?',
//                 choices: ['orange', 'purple', 'teal'],
//             },
//         ]);