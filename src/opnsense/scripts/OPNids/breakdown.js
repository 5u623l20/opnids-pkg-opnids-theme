const util = require('util');
const exec = util.promisify(require('child_process').exec);

const OPNIDS_PATH = '/usr/local';
const BACKUP_PATH = __dirname + '/__backup__';

require('path-reader')
  .promiseFiles('__backup__', 'file')
  .then(results => {
    return results.map(file => {
      return file
        .split('/')
        .slice(1)
        .join('/');
    });
  })
  .then(async results => {
    await results.forEach(async file => {
      const filepath = `${BACKUP_PATH}/${file}`;

      await exec(`cp ${filepath} ${OPNIDS_PATH}/${file}`);
    });
  });
