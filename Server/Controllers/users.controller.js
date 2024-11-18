const bcrypt = require("bcrypt");
const db = require("./../Config/db");

const usersController = {
  getAll: async (req, res) => {
    const query = "SELECT * FROM users";
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send({ error: err.message });
      } else {
        results.verify ? (results.verify = true) : (results.verify = false);
        results.forEach((e) => {
          e.verify ? (e.verify = true) : (e.verify = false);
        });
        res.send(results);
      }
    });
  },
  getOne: async (req, res) => {
    const userId = req.params.id;

    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [userId], (err, results) => {
      if (err) return res.status(500).send({ error: err.message });
      if (results.length === 0)
        return res.status(404).send({ message: "User not found" });
      else {
        results[0].verify
          ? (results[0].verify = true)
          : (results[0].verify = false);
        res.status(200).send(results[0]);
      }
    });
  },
  post: async (req, res) => {
    const { username, email, password, userProfile, verify } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO users (username, email, password , userProfile , verify ) VALUES (? , ?, ? , ? , ?)";
    db.query(
      query,
      [username, email, hashedPassword, userProfile, verify],
      (err, result) => {
        if (err) {
          res.status(500).send({ error: err.message });
        } else {
          res.send({ message: "Succesfully!", userId: result.insertId });
        }
      }
    );
  },
  delete: (req, res) => {
    const userId = req.params.id;

    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [userId], (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).send({ message: "User not found" });

      res
        .status(200)
        .send({ message: `User with ID ${userId} deleted successfully` });
    });
  },
  patch: async (req, res) => {
    const userId = req.params.id;
    const { username, email } = req.body;

    if (!username && !email) {
      return res
        .status(400)
        .send({ error: "At least one field (name or email) is required" });
    }

    const updates = [];
    const values = [];

    if (username) {
      updates.push("username = ?");
      values.push(username);
    }
    if (email) {
      updates.push("email = ?");
      values.push(email);
    }

    const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
    values.push(userId);

    db.query(query, values, (err, result) => {
      if (err) return res.status(500).send({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).send({ message: "User not found" });

      res
        .status(200)
        .send({ message: `User with ID ${userId} updated successfully` });
    });
  },
};

module.exports = usersController;
