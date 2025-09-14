const bcrypt = require('bcryptjs');

// Passwort-Hash hier einfügen (mit bcrypt generieren)
const HASHED_PASSWORD = '$2b$12$yad3tkPMJBG/rMdenkfome4blHgqZRNJRAtmpEyT37QlMSR7CJHSm';

exports.handler = async (event) => {
  try {
    const { password } = JSON.parse(event.body);

    const ok = await bcrypt.compare(password, HASHED_PASSWORD);
    if (ok) {
      // Einfacher Token, kann auch JWT sein
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, token: 'MEIN_GEHEIM_TOKEN' })
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false })
      };
    }
  } catch (err) {
    return { statusCode: 500, body: 'Server error' };
  }
};
