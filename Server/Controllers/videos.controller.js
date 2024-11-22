const db = require("../Config/db");

const videosController = {
  post: async (req, res) => {
    const filePath = `/uploads/${req.file.filename}`;
    let { userID, subjectID, title, content, isActive, isDelete, likes } =
      req.body;
    // Video yolunu MySQL'e kaydet
    isActive = isActive == "true" ? true : false;
    isDelete = isDelete == "true" ? true : false;
    const sql =
      "INSERT INTO videos (userID , subjectID , filePath , title , content , isActive , isDelete , likes) VALUES ( ? , ? ,? , ? , ? , ? , ? , ?)";
    db.query(
      sql,
      [userID, subjectID, filePath, title, content, isActive, isDelete, likes],
      (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Veritabanına kaydedilirken hata oluştu" });
        }
        res.status(200).json({ message: "Video başarıyla yüklendi!" });
      }
    );
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM videos WHERE id = ?";

    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error occurred." });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Video not found." });
      }

      const video = result[0];
      const videoUrl = `http://localhost:5000${video.filePath}`; // Video URL'si
      video.filePath = videoUrl; // URL'yi video objesine ekle

      res.status(200).json(video); // Video bilgisi ile URL döndürülür
    });
  },
  getAll: async (req, res) => {
    const sql = "SELECT * FROM videos";
    db.query(sql, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error occurred." });
      }
      res.status(200).json(results);
    });
  },
  delete: async (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM videos WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error occurred." });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Video not found." });
      }
      res.status(200).json({ message: "Video deleted successfully!" });
    });
  },
  put: async (req, res) => {
    const { id } = req.params;
    const { title, content, subjectID, isActive, isDelete, likes } = req.body;

    const sql = `
      UPDATE videos 
      SET 
        title = COALESCE(?, title),
        content = COALESCE(?, content),
        subjectID = COALESCE(?,content),
        isActive = COALESCE(?, isActive),
        isDelete = COALESCE(?, isDelete),
        likes = COALESCE(?, likes)
      WHERE id = ?
    `;

    const values = [
      title || null,
      content || null,
      subjectID || null,
      isActive === undefined ? null : isActive, // Boolean olabilir
      isDelete === undefined ? null : isDelete, // Boolean olabilir
      likes || null,
      id,
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error occurred." });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Video not found." });
      }
      res.status(200).json({ message: "Video updated successfully!" });
    });
  },
};

module.exports = videosController;
