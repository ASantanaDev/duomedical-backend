-- Tipo "estado"
CREATE TYPE estado AS ENUM ('Disponible', 'Ocupado', 'Agendada', 'Cancelada', 'Reagendada');

-- Tabla "usuario"
CREATE TABLE usuario (
    _id_usuario CHAR(10) PRIMARY KEY,
    primer_nombre VARCHAR(255) NOT NULL,
	segundo_nombre VARCHAR(255),
	primer_apellido VARCHAR(255) NOT NULL,
	segundo_apellido VARCHAR(255),
	contacto CHAR(10),
    email VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL,
	rol INT NOT NULL
);

-- Tabla "rol"
CREATE TABLE rol (
	_id_rol SERIAL PRIMARY KEY,
	rol VARCHAR(255) NOT NULL
);

-- Tabla "sexo"
CREATE TABLE sexo (
	_id_sexo SERIAL PRIMARY KEY,
	sexo VARCHAR(255) NOT NULL
);

-- Tabla "tipo_sangre"
CREATE TABLE tipo_sangre (
	_id_tipo_sangre SERIAL PRIMARY KEY,
	tipo_sangre VARCHAR(255) NOT NULL
);

-- Tabla "paciente"
CREATE TABLE paciente (
	_id_paciente CHAR(10) PRIMARY KEY,
	fecha_nacimiento DATE NOT NULL,
	tipo_sangre INT NOT NULL,
	peso DECIMAL (5,2) NOT NULL,
	altura INT NOT NULL,
	sexo INT NOT NULL
);

-- Tabla "medico"
CREATE TABLE medico (
	_id_medico CHAR(10) PRIMARY KEY,
	descripcion TEXT
);

-- Tabla "medico_especialidad"
CREATE TABLE medico_especialidad (
	_id_med_esp SERIAL PRIMARY KEY,
	medico CHAR (10) NOT NULL,
	titulo VARCHAR(255) NOT NULL,
	no_registro VARCHAR(255) NOT NULL
);

-- Tabla "servicio"
CREATE TABLE servicio (
	_id_servicio SERIAL PRIMARY KEY,
	servicio VARCHAR(255) NOT NULL
);

-- Tabla "tratamiento"
CREATE TABLE tratamiento (
	_id_tratamiento SERIAL PRIMARY KEY,
	servicio INT NOT NULL,
	tratamiento VARCHAR(255) NOT NULL,
	subtratamiento INT,
	CONSTRAINT fk_subtratamiento FOREIGN KEY (subtratamiento) REFERENCES tratamiento(_id_tratamiento)
);

-- Tabla "tratamiento_cita"
CREATE TABLE tratamiento_cita (
	_id_tratamiento_cita SERIAL PRIMARY KEY,
	tratamiento INT NOT NULL,
	cita INT NOT NULL
);

-- Tabla "cita"
CREATE TABLE cita (
	_id_cita SERIAL PRIMARY KEY,
	medico CHAR(10) NOT NULL,
	paciente CHAR(10) NOT NULL,
	estado_cita estado NOT NULL,
	motivo_consulta TEXT,
	enfermedad_actual TEXT,
	diagnostico_ingreso TEXT,
	horario TIME NOT NULL,
	fecha DATE NOT NULL
);

-- Tabla "historico_cita"
CREATE TABLE historico_cita (
	_id_historico_cita SERIAL PRIMARY KEY,
	medico CHAR(10) NOT NULL,
	paciente CHAR(10) NOT NULL,
	estado_cita estado NOT NULL,
	motivo_consulta TEXT,
	enfermedad_actual TEXT,
	diagnostico_ingreso TEXT,
	horario TIME NOT NULL,
	fecha DATE NOT NULL
);

-- Tabla "horario"
CREATE TABLE horario (
	_id_horario SERIAL PRIMARY KEY,
	hora_inicio TIME NOT NULL,
	hora_fin TIME NOT NULL,
	vigente BOOLEAN DEFAULT false
);

-- Tabla "calendario"
CREATE TABLE calendario (
	_id_calendario SERIAL PRIMARY KEY,
	horario INT NOT NULL,
	fecha DATE NOT NULL,
	estado_calendario estado NOT NULL
);

-- Agregar clave foránea a la tabla "usuario"
ALTER TABLE usuario
ADD CONSTRAINT fk_usuario_rol
FOREIGN KEY (rol) REFERENCES rol(_id_rol);

-- Agregar clave foránea a la tabla "medico"
ALTER TABLE medico
ADD CONSTRAINT fk_medico_usuario
FOREIGN KEY (_id_medico) REFERENCES usuario(_id_usuario);

-- Agregar clave foránea a la tabla "medico_especialidad"
ALTER TABLE medico_especialidad
ADD CONSTRAINT fk_medico_espcialidad_medico
FOREIGN KEY (medico) REFERENCES medico(_id_medico);
	
-- Agregar clave foránea a la tabla "paciente"
ALTER TABLE paciente
ADD CONSTRAINT fk_paciente_sexo
FOREIGN KEY (sexo) REFERENCES sexo(_id_sexo);

ALTER TABLE paciente
ADD CONSTRAINT fk_paciente_tipo_sangre
FOREIGN KEY (tipo_sangre) REFERENCES tipo_sangre(_id_tipo_sangre);

ALTER TABLE paciente
ADD CONSTRAINT fk_paciente_usuario
FOREIGN KEY (_id_paciente) REFERENCES usuario(_id_usuario);

-- Agregar clave foránea a la tabla "tratamiento"
ALTER TABLE tratamiento
ADD CONSTRAINT fk_tratamiento_servicio
FOREIGN KEY (servicio) REFERENCES servicio(_id_servicio);

-- Agregar clave foránea a la tabla "tratamiento_cita"
ALTER TABLE tratamiento_cita
ADD CONSTRAINT fk_tratamiento_cita_tratamiento
FOREIGN KEY (tratamiento) REFERENCES tratamiento(_id_tratamiento);

ALTER TABLE tratamiento_cita
ADD CONSTRAINT fk_tratamiento_cita_cita
FOREIGN KEY (cita) REFERENCES cita(_id_cita);

-- Agregar clave foránea a la tabla "cita"
ALTER TABLE cita
ADD CONSTRAINT fk_cita_medico
FOREIGN KEY (medico) REFERENCES medico(_id_medico);

ALTER TABLE cita
ADD CONSTRAINT fk_cita_paciente
FOREIGN KEY (paciente) REFERENCES paciente(_id_paciente);

-- Agregar clave foránea a la tabla "calendario"
ALTER TABLE calendario
ADD CONSTRAINT fk_calendario_horario
FOREIGN KEY (horario) REFERENCES horario(_id_horario);

-- Agregar columnas timestamp a la tabla 'usuario'
ALTER TABLE usuario
ADD COLUMN createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE usuario
ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Agregar columnas timestamp a la tabla 'rol'
ALTER TABLE rol
ADD COLUMN createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE rol
ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Agregar columnas timestamp a la tabla 'sexo'
ALTER TABLE sexo
ADD COLUMN createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE sexo
ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Agregar columnas timestamp a la tabla 'tipo_sangre'
ALTER TABLE tipo_sangre
ADD COLUMN createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE tipo_sangre
ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Agregar columnas timestamp a la tabla 'paciente'
ALTER TABLE paciente
ADD COLUMN createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE paciente
ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Agregar columnas timestamp a la tabla 'medico'
ALTER TABLE medico
ADD COLUMN createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE medico
ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Agregar columnas timestamp a la tabla 'medico_especialidad'
ALTER TABLE medico_especialidad
ADD COLUMN createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE medico_especialidad
ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Agregar columnas timestamp a la tabla 'servicio'
ALTER TABLE servicio
ADD COLUMN createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE servicio
ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Agregar columnas timestamp a la tabla 'tratamiento'
ALTER TABLE tratamiento
ADD COLUMN createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE tratamiento
ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Agregar columnas timestamp a la tabla 'tratamiento_cita'
ALTER TABLE tratamiento_cita
ADD COLUMN createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE tratamiento_cita
ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Agregar columnas timestamp a la tabla 'cita'
ALTER TABLE cita
ADD COLUMN createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE cita
ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Agregar columnas timestamp a la tabla 'historico_cita'
ALTER TABLE historico_cita
ADD COLUMN createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE historico_cita
ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Agregar columnas timestamp a la tabla 'horario'
ALTER TABLE horario
ADD COLUMN createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE horario
ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Agregar columnas timestamp a la tabla 'calendario'
ALTER TABLE calendario
ADD COLUMN createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE calendario
ADD COLUMN updatedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP;




