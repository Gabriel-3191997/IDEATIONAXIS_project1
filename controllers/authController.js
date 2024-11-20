const bcrypt = require("bcrypt");
const pool = require("../config/db");
const { generateToken } = require("../utils/tokenUtils");

exports.register = async (req, res) => {
  const { username, email, password, role_id } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (username, email, password, role_id) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, role_id]
    );
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (!user.length)
      return res.status(404).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials!" });

    const token = generateToken(user[0]);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
