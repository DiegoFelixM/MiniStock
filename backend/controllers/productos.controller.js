const db = require('../db');

exports.getAll = (req, res) => {
  db.query(
    'SELECT * FROM productos ORDER BY creado_en DESC',
    (err, results) => {
      if (err) return res.status(500).json(err);

      res.status(200).json(results);
    }
  );
};

exports.create = (req, res) => {
  const { nombre, categoria, stock, precio } = req.body;

  db.query(
    'INSERT INTO productos(nombre, categoria, stock, precio) VALUES (?, ?, ?, ?)',
    [nombre, categoria, stock, precio],
    (err) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: 'Producto creado correctamente'
      });
    }
  );
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { nombre, categoria, stock, precio } = req.body;

  db.query(
    'UPDATE productos SET nombre=?, categoria=?, stock=?, precio=? WHERE id=?',
    [nombre, categoria, stock, precio, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.status(200).json({
        message: 'Producto actualizado correctamente'
      });
    }
  );
};

exports.remove = (req, res) => {
  const { id } = req.params;

  db.query(
    'DELETE FROM productos WHERE id=?',
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.status(200).json({
        message: 'Producto eliminado correctamente'
      });
    }
  );
};

exports.getById = (req, res) => {
  const { id } = req.params;

  db.query(
    'SELECT * FROM productos WHERE id = ?',
    [id],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length === 0) {
        return res.status(404).json({
          message: 'Producto no encontrado'
        });
      }

      res.status(200).json(results[0]);
    }
  );
};