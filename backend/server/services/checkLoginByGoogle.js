const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const checkLoginByGoogle = async (tokenId, cd) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGEL_CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();
    cd({ name, email, picture });
  } catch {
    cd({ error: "somthing is wrong!" });
  }
};

module.exports = checkLoginByGoogle;
