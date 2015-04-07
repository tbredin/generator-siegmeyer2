'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

var Siegmeyer2Generator = yeoman.generators.Base.extend({
    promptUser: function() {
        var done = this.async();

        // have Yeoman greet the user
        console.log(this.yeoman);

        var prompts = [{
            name: 'appName',
            message: 'What is your app\'s name ?'
        }];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.addDemoSection = props.addDemoSection;

            done();
        }.bind(this));
    },
    scaffoldFolders: function(){
        this.mkdir("app");
        this.mkdir("app/images");
        this.mkdir("app/scripts");
        this.mkdir("app/styles");
        this.mkdir("app/templates");
        this.mkdir("app/webfonts");
    },
    copyMainFiles: function(){
        this.directory("app/styles", "app/styles");
        this.directory("app/scripts", "app/scripts");
        this.directory("app/templates", "app/templates");
        this.copy("_bowerrc", ".bowerrc");
        this.copy("_gitignore", ".gitignore");
        this.copy("Gemfile", "Gemfile");
        this.copy("Gemfile.lock", "Gemfile.lock");
        this.copy("gulpfile.js", "gulpfile.js");
        this.copy("editorconfig", "editorconfig");

        var context = {
            site_name: this.appName
        };

        this.template("_head.html", "app/templates/partials/_head.html", context);
        this.template("package.json", "package.json", context);
        this.template("bower.json", "bower.json", context);
        this.spawn
    },
    runInstalls: function(){
        // var done = this.async();
        this.installDependencies("", function(){
            console.log("\ndependencies installed\n");
            // done();
        });
    },
    end: function () {
        this.spawnCommand('bundle', ['install']);
    }
});

module.exports = Siegmeyer2Generator;
