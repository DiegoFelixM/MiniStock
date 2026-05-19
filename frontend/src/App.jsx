import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const API = import.meta.env.VITE_API_URL || '/api/productos';
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    nombre: '',
    categoria: '',
    stock: '',
    precio: ''
  });

  const mostrarMensaje = (texto) => {
    setMensaje(texto);

    setTimeout(() => {
      setMensaje('');
    }, 2500);
  };

  const cargarProductos = async () => {
    const response = await fetch(API);
    const data = await response.json();

    if (Array.isArray(data)) {
      setProductos(data);
    } else {
      setProductos([]);
      console.error(data);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const limpiarFormulario = () => {
    setForm({
      nombre: '',
      categoria: '',
      stock: '',
      precio: ''
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const producto = {
      nombre: form.nombre,
      categoria: form.categoria,
      stock: Number(form.stock),
      precio: Number(form.precio)
    };

    if (editingId) {
      const response = await fetch(`${API}/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      });

      const data = await response.json();
      mostrarMensaje(data.message || 'Producto actualizado');
    } else {
      const response = await fetch(API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      });

      const data = await response.json();
      mostrarMensaje(data.message || 'Producto creado');
    }

    limpiarFormulario();
    cargarProductos();
  };

  const handleEdit = (producto) => {
    setEditingId(producto.id);

    setForm({
      nombre: producto.nombre,
      categoria: producto.categoria,
      stock: producto.stock,
      precio: producto.precio
    });
  };

  const handleDelete = async (id) => {
    const response = await fetch(`${API}/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    mostrarMensaje(data.message || 'Producto eliminado');
    cargarProductos();
  };

  return (
    <div className="page">
      <div className="header">
        <h1>Mini Stock</h1>
        <p>Sistema básico de inventario</p>
      </div>

      {mensaje && (
        <div className="alert">
          {mensaje}
        </div>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <h2>{editingId ? 'Editar producto' : 'Agregar producto'}</h2>

        <div className="grid">
          <input
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />

          <input
            name="categoria"
            placeholder="Categoría"
            value={form.categoria}
            onChange={handleChange}
            required
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            required
          />

          <input
            name="precio"
            type="number"
            step="0.01"
            placeholder="Precio"
            value={form.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="actions">
          <button type="submit">
            {editingId ? 'Actualizar' : 'Guardar'}
          </button>

          {editingId && (
            <button
              type="button"
              className="secondary"
              onClick={limpiarFormulario}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <section className="list">
        <h2>Productos</h2>

        <div className="cards">
          {productos.map((producto) => (
            <div className="card" key={producto.id}>
              <div>
                <h3>{producto.nombre}</h3>
                <span>{producto.categoria}</span>
              </div>

              <p>
                <strong>Stock:</strong> {producto.stock}
              </p>

              <p>
                <strong>Precio:</strong> ${Number(producto.precio).toFixed(2)}
              </p>

              <p className="date">
                Creado: {new Date(producto.creado_en).toLocaleString()}
              </p>

              <div className="card-actions">
                <button onClick={() => handleEdit(producto)}>
                  Editar
                </button>

                <button
                  className="danger"
                  onClick={() => handleDelete(producto.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;