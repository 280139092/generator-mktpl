'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var path = require('path');

module.exports = class extends Generator {
  prompting() {
    // var done = this.async();  //当处理完用户输入需要进入下一个生命周期阶段时必须调用这个方法

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the cool ' + chalk.red('mktpl') + ' generator!'
    ));

    this.name = path.basename(process.cwd());
    this.description = 'A cool Vuejs project!';
    this.author = '';
    this.email = '';

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Name of the project:',
        default: this.name
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description:',
        default: this.description
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author:',
        default: this.author
      },
      {
        type: 'input',
        name: 'email',
        message: 'Email:',
        default: this.email
      }
    ];

    // this.prompt(prompts, (props) => {
    //   this.name = props.name;
    //   this.description = props.description;
    //   this.author = props.author;
    //   this.email = props.email;

    //   done();
    // })

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('build'),
      this.destinationPath('build')
    );
    this.fs.copy(
      this.templatePath('config'),
      this.destinationPath('config')
    );
    this.fs.copy(
      this.templatePath('html'),
      this.destinationPath('html')
    );
    this.fs.copy(
      this.templatePath('src'),
      this.destinationPath('src')
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      this.props
    );
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );
  }

  install() {
    this.installDependencies();
  }
};
