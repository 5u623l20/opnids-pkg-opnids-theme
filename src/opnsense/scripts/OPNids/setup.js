const util = require('util');
const exec = util.promisify(require('child_process').exec);

const OPNIDS_PATH = '/usr/local';
const BACKUP_PATH = __dirname + '/__backup__';

require('path-reader')
  .promiseFiles('src', 'file')
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
      const fileArr = file.split('/');
      const relative_dir = fileArr.slice(0, fileArr.length - 1).join('/');
      const filepath = `${OPNIDS_PATH}/${file}`;

      await exec(`mkdir -p ${BACKUP_PATH}/${relative_dir}`).then(async () => {
        await exec(`cp ${filepath} ${BACKUP_PATH}/${file}`);
      });
    });

    return results;
  })
  .then(async results => {
    await results.forEach(async file => {
      const target = __dirname + '/src/' + file;

      await exec(`cp ${target} ${OPNIDS_PATH}/${file}`);
    });
  });
