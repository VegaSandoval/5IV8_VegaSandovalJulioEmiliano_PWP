const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();

// ---------- CONFIGURACIÓN EJS + STATIC ----------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

// ---------- CONEXIÓN A MYSQL ----------
const pool = mysql.createPool({
  host: "localhost",
  user: "root",        // CAMBIA SI TU USUARIO ES OTRO
  password: "n0m3l0",        // PON TU PASSWORD SI TIENE
  database: "bitacoras_db",
  dateStrings: true    // para recibir DATETIME como string
});

// usamos promesas para poder usar async/await
const db = pool.promise();

// ---------- HELPERS ----------
function normalizeDate(input) {
  if (!input) return null;
  // viene como 2025-11-24T18:30 -> lo pasamos 2025-11-24 18:30
  return input.replace("T", " ");
}

function formatInputDate(value) {
  if (!value) return "";
  // si viene como Date
  if (value instanceof Date) {
    return value.toISOString().slice(0, 16);
  }
  // si viene como "YYYY-MM-DD HH:MM:SS"
  return value.replace(" ", "T").slice(0, 16);
}

function validateBitacora(body) {
  const errors = [];
  const estadosValidos = [
    "Óptimo",
    "Requiere seguimiento",
    "Pendiente de pieza"
  ];

  if (!body.id_equipo || body.id_equipo.trim() === "") {
    errors.push("El ID de equipo/activo es obligatorio.");
  }
  if (!body.fecha_programada) {
    errors.push("La fecha programada es obligatoria.");
  }
  if (!body.fecha_ejecucion) {
    errors.push("La fecha de ejecución es obligatoria.");
  }
  if (!body.tarea_realizada || body.tarea_realizada.trim() === "") {
    errors.push("La tarea realizada es obligatoria.");
  }
  if (!body.tecnico_responsable || body.tecnico_responsable.trim() === "") {
    errors.push("El técnico responsable es obligatorio.");
  }

  if (body.horas_ciclos && isNaN(parseInt(body.horas_ciclos))) {
    errors.push("Horas/ciclos debe ser un número entero.");
  }

  if (!estadosValidos.includes(body.estado_despues)) {
    errors.push("Selecciona un estado válido después del servicio.");
  }

  return errors;
}

// ---------- RUTAS ----------

// Listar todas las bitácoras
app.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM bitacora_mantenimiento ORDER BY id DESC"
    );
    res.render("index", { bitacoras: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al obtener las bitácoras");
  }
});

// Formulario para crear nueva
app.get("/bitacoras/nueva", (req, res) => {
  res.render("form", { bitacora: null, errors: [] });
});

// Crear (CREATE)
app.post("/bitacoras", async (req, res) => {
  const errors = validateBitacora(req.body);

  if (errors.length > 0) {
    const bitacora = {
      ...req.body,
      fecha_programada_input: req.body.fecha_programada,
      fecha_ejecucion_input: req.body.fecha_ejecucion
    };
    return res.render("form", { bitacora, errors });
  }

  const data = {
    id_equipo: req.body.id_equipo.trim(),
    fecha_programada: normalizeDate(req.body.fecha_programada),
    fecha_ejecucion: normalizeDate(req.body.fecha_ejecucion),
    tarea_realizada: req.body.tarea_realizada.trim(),
    tecnico_responsable: req.body.tecnico_responsable.trim(),
    horas_ciclos: req.body.horas_ciclos
      ? parseInt(req.body.horas_ciclos)
      : null,
    estado_despues: req.body.estado_despues
  };

  try {
    await db.query(
      `INSERT INTO bitacora_mantenimiento 
      (id_equipo, fecha_programada, fecha_ejecucion, tarea_realizada, tecnico_responsable, horas_ciclos, estado_despues)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        data.id_equipo,
        data.fecha_programada,
        data.fecha_ejecucion,
        data.tarea_realizada,
        data.tecnico_responsable,
        data.horas_ciclos,
        data.estado_despues
      ]
    );

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al guardar la bitácora");
  }
});

// Formulario para editar
app.get("/bitacoras/editar/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const [rows] = await db.query(
      "SELECT * FROM bitacora_mantenimiento WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.redirect("/");
    }

    const bitacora = rows[0];
    bitacora.fecha_programada_input = formatInputDate(
      bitacora.fecha_programada
    );
    bitacora.fecha_ejecucion_input = formatInputDate(
      bitacora.fecha_ejecucion
    );

    res.render("form", { bitacora, errors: [] });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al cargar la bitácora");
  }
});

// Actualizar (UPDATE)
app.post("/bitacoras/editar/:id", async (req, res) => {
  const id = req.params.id;
  const errors = validateBitacora(req.body);

  if (errors.length > 0) {
    const bitacora = {
      ...req.body,
      id,
      fecha_programada_input: req.body.fecha_programada,
      fecha_ejecucion_input: req.body.fecha_ejecucion
    };
    return res.render("form", { bitacora, errors });
  }

  const data = {
    id_equipo: req.body.id_equipo.trim(),
    fecha_programada: normalizeDate(req.body.fecha_programada),
    fecha_ejecucion: normalizeDate(req.body.fecha_ejecucion),
    tarea_realizada: req.body.tarea_realizada.trim(),
    tecnico_responsable: req.body.tecnico_responsable.trim(),
    horas_ciclos: req.body.horas_ciclos
      ? parseInt(req.body.horas_ciclos)
      : null,
    estado_despues: req.body.estado_despues
  };

  try {
    await db.query(
      `UPDATE bitacora_mantenimiento 
       SET id_equipo=?, fecha_programada=?, fecha_ejecucion=?, 
           tarea_realizada=?, tecnico_responsable=?, horas_ciclos=?, estado_despues=?
       WHERE id=?`,
      [
        data.id_equipo,
        data.fecha_programada,
        data.fecha_ejecucion,
        data.tarea_realizada,
        data.tecnico_responsable,
        data.horas_ciclos,
        data.estado_despues,
        id
      ]
    );

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar la bitácora");
  }
});

// Borrar (DELETE)
app.post("/bitacoras/eliminar/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await db.query("DELETE FROM bitacora_mantenimiento WHERE id = ?", [id]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar la bitácora");
  }
});

// ---------- ARRANCAR SERVIDOR ----------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
