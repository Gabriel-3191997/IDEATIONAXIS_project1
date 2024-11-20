const pool = require("../config/db");

exports.getProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const [user] = await pool.query(
      "SELECT id, username, email, role_id FROM users WHERE id = ?",
      [userId]
    );
    if (!user.length)
      return res.status(404).json({ message: "User not found!" });
    res.status(200).json(user[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.user.id;
  const { username, email } = req.body;

  try {
    await pool.query("UPDATE users SET username = ?, email = ? WHERE id = ?", [
      username,
      email,
      userId,
    ]);
    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
