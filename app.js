const chalk = require('chalk');
const numeral = require('numeral');
const { sprintf } = require('sprintf-js');
const fetchAll = require('./lib/fetchAll');
const sites = require('./lib/urls');

fetchAll(sites[25]).then(response => {
  //metaReport(response.meta);
  filesReport(response.files);
  process.exit(0);
})
.catch(err => {
	console.log("CAUGHT ERROR", err);
	process.exit(1);
});


/**
 * Metadata Report
 */
function metaReport(meta) {
  meta.forEach(tag => {
    let name = tag.name;
    let type = tag.type.name;

    if (type) {
      console.log(chalk.green(tag.label));
    }
    else {
      console.log(tag.label, toAttrs(tag.attrs));
    }
  });
}

function toAttrs(attrs) {
  const keys = Object.keys(attrs);
  const skeys = keys.sort((a, b) => b.localeCompare(a));

  return skeys.reduce((memo, key) => {
    return memo + ' ' + key + '="'
      + chalk.grey(attrs[key]) + '"';
  }, '');
}

/**
 * Display Files Report
 */
function filesReport(files) {
  let count = 0;
  let sizes = 0;
  let times = 0;

  console.log("-".repeat(80));

  files.forEach(file => {
    count += 1;
    sizes += file.size;
    times += file.time;

    const out = sprintf("%2d. %6s %10s b %8s ms   %s",
      count,
      file.type,
      numeral(file.size).format('0,0'),
      numeral(file.time).format('0,0'),
      file.url
    );
    if (file.error) {
      console.log(chalk.red(out));
    }
    else {
      console.log(out);
    }
  });

  console.log("-".repeat(80));

  console.log(sprintf("    %6s %10s b %8s ms  ",
    "totals",
    numeral(sizes).format('0,0'),
    numeral(times).format('0,0')
  ));
}
