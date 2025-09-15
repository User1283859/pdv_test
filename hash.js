
const args = process.argv.slice(2); // alles ab drittem Element

// Beispiel: erstes Argument in Variable speichern
const input = args[0];


console.log(require('crypto').createHash('sha256').update(input).digest('hex'))