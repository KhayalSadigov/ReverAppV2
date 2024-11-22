const db = require("./../Config/db");

const subjectsController = {
  getAll: async (req, res) => {
    try {
      const subjects = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM subjects", (err, results) => {
          if (err) return reject(err);
          results.forEach((e) => {
            e.verify = !!e.verify; // Boolean olaraq çevrilir
          });
          resolve(results);
        });
      });

      const subjectsWithVideos = await Promise.all(
        subjects.map(async (subject) => {
          const videos = await new Promise((resolve, reject) => {
            db.query(
              "SELECT * FROM videos WHERE subjectID = ?",
              [subject.id],
              (err, results) => {
                if (err) return reject(err);
                resolve(results);
              }
            );
          });
          return { ...subject, videos }; // Videos əlavə edilir
        })
      );

      res.send(subjectsWithVideos);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params; // `id` parametri URL-dən alınır
    try {
      const subject = await new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM subjects WHERE id = ?",
          [id],
          (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) {
              return reject(new Error("Subject not found"));
            }
            const subject = results[0];
            subject.verify = !!subject.verify; // Boolean dəyərə çevrilir
            resolve(subject);
          }
        );
      });

      const videos = await new Promise((resolve, reject) => {
        db.query(
          "SELECT * FROM videos WHERE subjectID = ?",
          [id],
          (err, results) => {
            if (err) return reject(err);
            resolve(results);
          }
        );
      });

      subject.videos = videos;
      res.send(subject);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  },
};

module.exports = subjectsController;
