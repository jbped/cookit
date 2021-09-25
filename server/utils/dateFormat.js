   
const dayjs = require('dayjs');

module.exports = (timestamp) => {
    return dayjs(timestamp).format('MM/DD/YYYY [at] h[:]m A');
};