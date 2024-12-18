import { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa"; 

function App() {
  const [tarea, setTarea] = useState({ nombre: "", descripcion: "" });
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    // Carga de tareas desde localStorage al inicio
    const tareasGuardadas = JSON.parse(localStorage.getItem("tareas")) || [];
    setTareas(tareasGuardadas);
  }, []);

  useEffect(() => {
    // Guardar tareas en localStorage
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  const handleAddTask = () => {
    if (!tarea.nombre || !tarea.descripcion) return;

    const nuevaTarea = {
      ...tarea,
      id: Date.now(),
      completada: false,
      fecha: new Date().toLocaleString(),
    };
    setTareas([nuevaTarea, ...tareas]);
    setTarea({ nombre: "", descripcion: "" });
  };

  const handleToggleComplete = (id) => {
    setTareas(
      tareas.map((task) =>
        task.id === id ? { ...task, completada: !task.completada } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTareas(tareas.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-4">Gestor de Tareas</h1>
        <div className="mb-6">
          <input
            type="text"
            value={tarea.nombre}
            onChange={(e) => setTarea({ ...tarea, nombre: e.target.value })}
            placeholder="Nombre de la tarea"
            className="p-2 border border-gray-300 rounded mb-2 w-full"
          />
          <textarea
            value={tarea.descripcion}
            onChange={(e) => setTarea({ ...tarea, descripcion: e.target.value })}
            placeholder="Descripción de la tarea"
            className="p-2 border border-gray-300 rounded w-full"
          />
          <button
            onClick={handleAddTask}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
          >
            Agregar Tarea
          </button>
        </div>

        <div>
          {tareas.map((task) => (
            <div
              key={task.id}
              className="mb-4 p-4 bg-gray-50 rounded shadow"
            >
              <div className="flex justify-between items-center">
                {/* Botón para eliminar tarea */}
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className={`text-gray-500 ${task.completada ? "text-red-500" : "text-gray-400"} p-2 rounded`}
                  disabled={!task.completada}
                >
                  <FaTrashAlt />
                </button>

                <h3 className={`text-lg font-semibold ${task.completada ? "line-through text-gray-500" : ""}`}>
                  {task.nombre}
                </h3>

                <button
                  onClick={() => handleToggleComplete(task.id)}
                  className={`px-4 py-2 rounded ${task.completada ? "bg-green-500" : "bg-gray-300"}`}
                >
                  {task.completada ? "Completada" : "Marcar como Completa"}
                </button>
              </div>
              <p>{task.descripcion}</p>
              <small className="text-sm text-gray-500">Creada el: {task.fecha}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
