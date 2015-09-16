const create = require('./create');

module.exports = function (args){
  switch (args._[1]) {
    case 'resource':
      createResource(args._[2]);
      break;
    case 'function':
      createFunction(args._[2]);
      break;
    case 'model':
      createModel(args._[2]);
      break;
    case 'stage':
      createStage(args._[2]);
      break;
    default:
      console.log('default command');
  }
};

function createResource(name){
  return create.dir('./resources/' + name);
}

function createModel(){}

function createStage(){}

function createFunction(name){
  return create.dir('./functions/' + name).
    then(createIndexJS).
    then(createPackageJSON);

  function createIndexJS(){
    const index = `module.exports.handler = function(event, context) {
      // DO STUFF HERE
    }`;
    create.file('./functions/' + name + '/index.js', index);
  }

  function createPackageJSON(){
    const packageJSON = {
      'name': name,
      'version': '0.0.1',
      'description': '',
      'main': 'index.js',
      'scripts': {
        'test': 'echo \"Error: no test specified\" && exit 1'
      },
      'author': '',
      'dependencies': {}
    };
    create.file('./functions/' + name + '/package.json', packageJSON);
  }
}