const bcrypt = require('bcryptjs');
const pw = process.argv[2]; 
console.log(bcrypt.hashSync(pw, 12));