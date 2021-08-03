#!/usr/bin/env node
process.env.NODE_PATH = __dirname + '../node_modules/';
const path = require('path');
const { resolve }  = path;
const res = (command)=>{
  const path = resolve(__dirname, '../src/commands/', command);
  const c = require(path);
  return c
};
const program = require('commander');
const inquirer = require('inquirer');

const { name, version } = require('../package.json');

program.version(version);

const run = (arg)=>{
  const [i, o] = process.argv;
  return program.parse([i, o, ...arg]);
}

const promptQuestions = [
  {
    type: "list",
    name: "projectType",
    message: "请选择你要创建的项目类型？",
    choices: [
      { name: 'React', value: 'React' },
      { name: 'Vue', value: 'Vue' }
    ]
  },
//  {
//     type: "list",
//     name: "antdVersion",
//     message: "请选择AntDesign版本号？",
//     choices: [
//       { name: '^4.1.0', value: '^4.1.0' },
//       { name: '^3.21.4', value: '^3.21.4' },
//       { name: '@latest', value: '@latest' },
//     ]
//   },
  // {
  //   type: "list",
  //   name: "reactVersion",
  //   message: "请选择React版本号？",
  //   choices: [
  //     { name: '^16.6.3', value: '^16.6.3' },
  //     { name: '^16.8.2', value: '^16.8.2' },
  //     { name: '@latest', value: '@latest' }
  //   ]
  // },
  // {
  //   type: "list",
  //   name: "cssLoader",
  //   message: "请选择你要使用的CSS预处理语音？",
  //   choices: [
  //     { name: 'Sass', value: 'sass-loader' },
  //     { name: 'Less', value: 'less less-loader' }
  //   ]
  // },
  // {
  //   type: "confirm",
  //   name: "adoptTypeScript",
  //   message: "是否启用TypeScript？"
  // },
  // {
  //   type: "checkbox",
  //   name: "middlePlugins",
  //   message: "请选择要启用的中间件？",
  //   choices: [
  //     { name: 'Redux-Saga', value: 'Redux-Saga' },
  //     { name: 'Thunk', value: 'Thunk' }
  //   ]
  // },
  // {
  //   type: "confirm",
  //   name: "adoptESLintSelect",
  //   message: "是否启用ESLint？"
  // },
  // {
  //   type: "list",
  //   name: "webpackVersion",
  //   message: "请选择Webpack版本号？",
  //   choices: [
  //     { name: '^4.25.1', value: '^4.25.1' },
  //     { name: '@latest', value: '@latest' }
  //   ]
  // },
  // {
  //   type: "list",
  //   name: "licenseTypeSelect",
  //   message: "请选择项目所采用的协议类型？",
  //   choices: [
  //     { name: 'ISC', value: 'ISC' },
  //     { name: 'MIT', value: 'MIT' }
  //   ]
  // },
  // {
  //   type: "input",
  //   name: "author",
  //   message: "请输入作者？"
  // }
]

global.zhaCli_projectConfig = {};

program
  .command('create <projectName>')
  .description('create a new project')
	.action((projectName, cmd)=>{
    global.zhaCli_projectConfig.project_name = projectName;

    const p = process.cwd();

    global.zhaCli_projectConfig['project_path'] = resolve(p, projectName);

    inquirer.prompt(promptQuestions).then((answer)=>{
      global.zhaCli_projectConfig.options = answer

      run(['init']);
    });
  })
  
  program
  .command('init')
  .description('Initialize the configuration files of the project')
	.action((cmd)=>{
    const {project_name, project_path} = global.zhaCli_projectConfig;

    const init = res('init.js');
    init();
  })

program.parse(process.argv);