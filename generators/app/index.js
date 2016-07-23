var generators = require('yeoman-generator');
var git = require('gulp-git');
var fs = require('fs');

module.exports = generators.Base.extend({
  prompting: function () {
    return this.prompt([{
      type    : 'confirm',
      name    : 'platform',
      message : 'Is your iot device Raspberry Pi?'
    }, {
      type    : 'input',
      name    : 'host',
      message : 'What is the hostname of your iot device?',
      default : ""
    }, {
      type    : 'input',
      name    : 'username',
      message : 'What is the username of your iot device?',
      default : "pi"
    }, {
      type    : 'input',
      name    : 'password',
      message : 'What is the password of your iot device?',
      default : "raspberry"
    }]).then(function (answers) {
      git.clone('https://github.com/shizn/HP-IoT-test', function (err) {
        if (err) throw err;
        var config = {}

        config.host = answers.host
        config.username = answers.username
        config.password = answers.password

        var configFilename = "HP-IoT-test/iot_config.json"

        fs.writeFile(configFilename, JSON.stringify(config, null, 4), function(err) {
          if(err) {
            console.log(err);
          }
        });
      });
    }.bind(this));
  }
});