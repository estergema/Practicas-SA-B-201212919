CREATE DATABASE [P2-estrellita-armas];
GO

-- Usar la base de datos creada
USE [P2-estrellita-armas];
GO

-- 1. Crear las tablas

-- Tabla: Estados
CREATE TABLE Estados (
    idEstado INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(50) NOT NULL,
    descripcion NVARCHAR(50) NOT NULL,
	fecha_creacion DATETIME NOT NULL DEFAULT GETDATE(),
    fecha_modificacion DATETIME NOT NULL DEFAULT GETDATE(),
	idUsuario INT
);

-- Tabla: Roles
CREATE TABLE Roles (
    idRol INT PRIMARY KEY IDENTITY(1,1),
    descripcion NVARCHAR(50) NOT NULL
);

-- Tabla: Usuarios
CREATE TABLE Usuarios (
    idUsuario INT PRIMARY KEY IDENTITY(1,1),
    nombre_completo NVARCHAR(100) NOT NULL,
    correo NVARCHAR(100) UNIQUE NOT NULL,
    password NVARCHAR(255) NOT NULL,
    telefono NVARCHAR(15) NOT NULL,
    fecha_nacimiento DATETIME NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT GETDATE(),
    fecha_modificacion DATETIME NOT NULL DEFAULT GETDATE(),
    idEstado INT NOT NULL,
    idRol INT NOT NULL,
    CONSTRAINT FK_Usuarios_Roles FOREIGN KEY (idRol) REFERENCES Roles(idRol) ON UPDATE NO ACTION,
    CONSTRAINT FK_Usuarios_Estados FOREIGN KEY (idEstado) REFERENCES Estados(idEstado) ON UPDATE NO ACTION,
);

-------------------------------------------------------------------------------------------------------------------------------
-- Usar la base de datos creada
USE [P2-estrellita-armas];
GO

CREATE PROCEDURE InsertarEstado
    @nombre NVARCHAR(50),
    @descripcion NVARCHAR(50)
AS
BEGIN
    INSERT INTO Estados (nombre, descripcion)
    VALUES (@nombre, @descripcion)
END
GO

CREATE PROCEDURE InsertarRol
    @descripcion NVARCHAR(50)
AS
BEGIN
    INSERT INTO Roles (descripcion)
    VALUES (@descripcion)
END
GO

CREATE PROCEDURE InsertarUsuario
    @nombre_completo NVARCHAR(100),
    @correo NVARCHAR(100),
    @password NVARCHAR(255),
    @telefono NVARCHAR(15),
    @fecha_nacimiento DATETIME,
    @idEstado INT,
    @idRol INT
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        -- Validar si el correo ya existe
        IF EXISTS (SELECT 1 FROM Usuarios WHERE correo = @correo)
        BEGIN
            PRINT 'Error: El correo ya est� registrado.';
            RETURN;
        END;

        -- Si el correo no existe, insertar el nuevo usuario
        INSERT INTO Usuarios (nombre_completo, correo, password, telefono, fecha_nacimiento, idEstado, idRol)
		VALUES (@nombre_completo, @correo, @password, @telefono, @fecha_nacimiento, @idEstado, @idRol)

		-- Obtenemos el ID del usuario insertado
		DECLARE @idUsuario INT = SCOPE_IDENTITY();
		-- Seleccionamos el producto insertado
		SELECT nombre_completo, correo, telefono, fecha_nacimiento, idEstado, idRol
		  FROM Usuarios 
		  WHERE idUsuario = @idUsuario

    END TRY
    BEGIN CATCH
        -- Manejo de errores
        PRINT 'Ocurri� un error al insertar el usuario.';
        PRINT ERROR_MESSAGE(); -- Muestra el mensaje del error
    END CATCH
END;
GO


CREATE PROCEDURE AuthenticarUsuario
    @correo NVARCHAR(100),
    @password NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Variable para almacenar la contrase�a hasheada de la base de datos
    DECLARE @passwordHashed NVARCHAR(255);
    
    -- Buscar el usuario por correo
    SELECT @passwordHashed = password
    FROM Usuarios
    WHERE correo = @correo;

    -- Verificar si el correo existe
    IF @passwordHashed IS NULL
    BEGIN
        -- Si no existe el usuario, devolver error 404
        RAISERROR('Usuario no encontrado', 16, 1);
        RETURN;
    END
    
    -- Generar el hash de la contrase�a proporcionada usando SHA2_256
    DECLARE @hashedPassword NVARCHAR(255);
    SET @hashedPassword =  @password;

    -- Comparar la contrase�a proporcionada con la almacenada
    IF @hashedPassword != @passwordHashed
    BEGIN
        -- Si las contrase�as no coinciden, devolver error 403
        RAISERROR('Contrase�a incorrecta', 16, 1);
        RETURN;
    END

    -- Si la validaci�n fue exitosa, devolver los detalles del usuario
    SELECT idUsuario, nombre_completo, correo, telefono, fecha_nacimiento, fecha_creacion, fecha_modificacion, idEstado, idRol
    FROM Usuarios
    WHERE correo = @correo;
END;
GO





USE [P2-estrellita-armas];
GO


EXEC InsertarRol 'Administrador';
EXEC InsertarRol 'Operador';
EXEC InsertarRol 'Cliente';


EXEC InsertarEstado 'Activo', 'El estado indica que est� disponible';
EXEC InsertarEstado 'Inactivo', 'El estado indica que est� deshabilitado';
EXEC InsertarEstado 'Pendiente', 'Estado en espera de acci�n';
EXEC InsertarEstado 'En proceso', 'Se est� ejecutando la acci�n';
EXEC InsertarEstado 'Completado', 'La acci�n fue finalizada';
EXEC InsertarEstado 'Cancelado', 'La acci�n fue detenida';
EXEC InsertarEstado 'Rechazado', 'Solicitud rechazada';
EXEC InsertarEstado 'Aprobado', 'Solicitud aprobada';
EXEC InsertarEstado 'En revisi�n', 'Pendiente de aprobaci�n/revisi�n';
EXEC InsertarEstado 'Suspendido', 'Acci�n suspendida temporalmente';
EXEC InsertarEstado 'Finalizado', 'Proceso terminado exitosamente';
EXEC InsertarEstado 'Disponible', 'Elemento disponible para uso';
EXEC InsertarEstado 'No disponible', 'Elemento no est� disponible';
EXEC InsertarEstado 'Reservado', 'Elemento reservado';
EXEC InsertarEstado 'Confirmado', 'Acci�n confirmada';
EXEC InsertarEstado 'Expirado', 'Elemento fuera de tiempo';
EXEC InsertarEstado 'Pagado', 'Orden o servicio pagado';
EXEC InsertarEstado 'No pagado', 'Orden o servicio pendiente de pago';
EXEC InsertarEstado 'Devuelto', 'Producto o servicio regresado';
EXEC InsertarEstado 'En tr�nsito', 'Elemento en camino';


EXEC InsertarUsuario 'Juan P�rez', 'juan.perez@example.com', 'securePass123', '41112222', '1990-03-15', 1, 1;  -- ADMINISTRADOR
EXEC InsertarUsuario 'Mar�a L�pez', 'maria.lopez@example.com', 'password123', '42223333', '1985-07-20', 1, 2; -- OPERADOR 
EXEC InsertarUsuario 'Carlos Ram�rez', 'carlos.ramirez@example.com', 'mypassword!', '43334444', '1992-12-01', 1, 2;  
EXEC InsertarUsuario 'Ana Gonz�lez', 'ana.gonzalez@example.com', 'StrongPass2024', '44445555', '1988-05-10', 1, 2;
EXEC InsertarUsuario 'Luis Torres', 'luis.torres@example.com', 'Torres@456', '4468666', '1993-01-25', 1, 2;
EXEC InsertarUsuario 'Sof�a Rivera', 'sofia.rivera@example.com', 'Rivera123!', '46667777', '1990-08-30', 1, 2;
EXEC InsertarUsuario 'Pedro S�nchez', 'pedro.sanchez@example.com', 'SafePass321', '47778888', '1987-03-14', 1, 2;
EXEC InsertarUsuario 'Luc�a Mart�nez', 'lucia.martinez@example.com', 'LuciaPass!', '48889999', '1995-11-22', 2, 2;
EXEC InsertarUsuario 'Diego Hern�ndez', 'diego.hernandez@example.com', 'Hernandez2024', '49990000', '1989-06-05', 1, 2;
EXEC InsertarUsuario 'Laura Vega', 'laura.vega@example.com', 'Vega@456', '40001111', '1991-10-18', 2, 2;
EXEC InsertarUsuario 'Manuel Ortiz', 'manuel.ortiz@example.com', 'OrtizSecure!', '41112223', '1986-09-09', 1, 2;
EXEC InsertarUsuario 'Isabel Romero', 'isabel.romero@example.com', 'RomeroPass!', '42223334', '1994-12-25', 2, 2;
EXEC InsertarUsuario 'Clara Castillo', 'clara.castillo@example.com', 'Castillo123!', '43334445', '1990-07-07', 2,2;
EXEC InsertarUsuario 'Pablo Flores', 'pablo.flores@example.com', 'Flores#2024', '44445556', '1989-05-03', 1, 2;
EXEC InsertarUsuario 'Enrique Navarro', 'enrique.navarro@example.com', 'Navarro@456', '446667', '199204-12', 1, 2;
EXEC InsertarUsuario 'Carolina Rojas', 'carolina.rojas@example.com', 'Rojas#123', '46667778', '1987-08-29', 2, 2;
EXEC InsertarUsuario 'Jorge Ramos', 'jorge.ramos@example.com', 'Ramos2024!', '47778889', '1986-11-01', 1, 2;
EXEC InsertarUsuario 'Paula D�az', 'paula.diaz@example.com', 'Paula@2024', '48889990', '1995-01-17', 2, 2;
EXEC InsertarUsuario 'Alberto M�ndez', 'alberto.mendez@example.com', 'Mendez@456', '49990001', '1993-03-10', 1, 2 ;
EXEC InsertarUsuario 'Rosa Garc�a', 'rosa.garcia@example.com', 'Garcia#Secure!', '40001112', '1994-12-21', 2, 2;
