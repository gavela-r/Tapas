-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-01-2025 a las 15:54:17
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tapleon`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bares`
--

CREATE TABLE `bares` (
  `id_bar` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `latitud` decimal(10,8) DEFAULT NULL,
  `longitud` decimal(11,8) DEFAULT NULL,
  `hora_apertura` time DEFAULT NULL,
  `hora_cierre` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `bares`
--

INSERT INTO `bares` (`id_bar`, `nombre`, `direccion`, `telefono`, `latitud`, `longitud`, `hora_apertura`, `hora_cierre`) VALUES
(1, 'Bar Las Torres', 'Av. de Álvaro López Núñez, 25, León', '987234567', 42.00000000, -5.00000000, '12:00:00', '23:30:00'),
(2, 'Restaurante Ezequiel', 'Calle Ancha, 20, León', '987123456', 42.00000000, -5.00000000, '12:00:00', '23:30:00'),
(3, 'Casa Blas', 'C/ Sampiro, 1, León', '987345678', 42.00000000, -5.00000000, '12:00:00', '23:30:00'),
(4, 'Bar La Tizona', 'Calle de Ordoño IV, 10, León', '987456789', 42.00000000, -5.00000000, '12:00:00', '23:30:00'),
(5, 'Camarote Madrid', 'C/ Cervantes, 8, León', '987567890', 42.00000000, -5.00000000, '12:00:00', '23:30:00'),
(6, 'Bar Genarín', 'Plaza del Espolón, León', '987678901', 42.00000000, -5.00000000, '12:00:00', '23:30:00'),
(7, 'El Patio', 'Plaza Torres de Omaña, 2, León', '987789012', 42.00000000, -5.00000000, '12:00:00', '23:30:00'),
(8, 'Café Bar Rúa 11', 'Calle La Rúa, León', '987890123', 42.00000000, -5.00000000, '12:00:00', '23:30:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `contrasena` char(128) NOT NULL,
  `tipo` enum('user','admin') DEFAULT 'user',
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre_usuario`, `contrasena`, `tipo`, `email`) VALUES
(1, 'admin', 'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec', 'admin', 'admin@example.com'),
(2, 'user1', 'b14361404c078ffd549c03db443c3fede2f3e534d73f78f77301ed97d4a436a9fd9db05ee8b325c0ad36438b43fec8510c204fc1c1edb21d0941c00e9e2c1ce2', 'user', 'user1@example.com'),
(3, 'user2', '291116775902b38dd09587ad6235cec503fc14dbf9c09cad761f2e5a5755102eaceb54b95ffd179c22652c3910dbc6ed85ddde7e09eef1ecf3ad219225f509f5', 'user', 'user2@example.com'),
(4, 'user3', '8ac4145c8e388ddfe3cd94886f026260d917cab07903c533f3a26945019bc4a50e6f23f266acbb0cbae89130fa3242c9a5145e4218c3ef1deebccb58d1a64a43', 'user', 'user3@example.com'),
(5, 'user4', '6725c0435c585ea54b0dbba81ae7cad2e56257efd6ab10940ffc3e7adc1274b44379a1c1e8f0e5bd1fe01e3774ffe2b2a53f5f31f7cb091a9fd6be55471457d7', 'user', 'user4@example.com'),
(6, 'user5', '4f796267fa62838c0146d10fae3394877ccdb5197be86f20adcc3b0b844ab913a9530ae6b51f3f117d616899befac104daac2dc302e1e42c11451e8612e042e8', 'user', 'user5@example.com'),
(7, 'user6', '98e0de00aaf6c95eaafcd4e99a1258a06cf2c2465badf0c138e5fd5c462bdd27f37573b830b60a23946cf2e0fb77762c1b1daef9b44ff9dd9ca509a64a4069b5', 'user', 'user6@example.com'),
(8, 'user7', 'bfa2c173b6ea6f0231a9695c0dd068c916c40d6f7004eef72c1c84fa8068563ea8a2f24e40ba905e7b44212147fa3fd213e1689a2b14e2660fe3dfec958d61e3', 'user', 'user7@example.com'),
(9, 'user8', '437fdf2893dc62b6290725e12a91ebfd5ba9d55e33bab0a9f8775edb1a43caa508bde707697d77a3f4248bb9112ce03c93e89ff79470695c2debdeb6919b4def', 'user', 'user8@example.com'),
(10, 'user9', 'bc2b45060e6b26332b9296dc418858e3ee4bfcccab7309de9630f67ec756d15ad90c762f4fb027a8a57d1735c310537c8ffe7beaf1fb6138be912cd40d8aa0bb', 'user', 'user9@example.com'),
(11, 'adrian', '$2y$10$qNW08GHoufOWbGFzqHG/FeeUy4FxtAVlRiAXOSThmPBu0cjMTqvGu', 'admin', 'adriangavela09@gmail.com'),
(12, 'usuario', '$2y$10$CsfJccTFoFkSW67Sg11TBevrapC2mxiCkMIUKcLNvmhRjt6ImEwZ6', 'user', 'usuario@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_tapa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tapas`
--

CREATE TABLE `tapas` (
  `id_tapa` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `ingredientes` text DEFAULT NULL,
  `bar` int(11) DEFAULT NULL,
  `foto` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tapas`
--

INSERT INTO `tapas` (`id_tapa`, `nombre`, `descripcion`, `ingredientes`, `bar`, `foto`) VALUES
(2, 'Tortilla de Patata', 'Tradicional tortilla española elaborada con huevos, patatas y cebolla.', 'Huevos, patatas, cebolla, sal', 2, './fotosUsuario/1737981185zoom-ed33006354886cff3b7d7b01d3629fb7-920-518.jpg'),
(3, 'Calamares Fritos', 'Anillas de calamar rebozadas y fritas, servidas con un toque de limón.', 'Calamares, harina, limón', 3, './fotosUsuario/1737981367calamari-ring-600x400.jpg'),
(4, 'Figón', 'Una combinación sabrosa de carne de cerdo, pan y verduras como cebolla y pimientos.', 'Carne de cerdo, pan, cebolla, pimientos', 4, './fotosUsuario/1737981403090520121039-600x400.jpg'),
(5, 'Morcilla de León', 'Una especialidad a base de morcilla, cebolla y pan con un sabor intenso y característico.', 'Mejillones, salsa picante, ajo', 5, './fotosUsuario/1737989280ganadores-mejor-tapa-de-morcilla-1.jpg'),
(6, 'Mejillones Picantes', 'Mejillones cocidos en una salsa picante con ajo que realza su sabor.', 'Mejillones, salsa picante, ajo', 6, './fotosUsuario/1737989340images.jpeg'),
(7, 'Cecina y Queso', 'Finas lonchas de cecina combinadas con queso de cabra y un toque de aceite de oliva.', 'Cecina, queso de cabra, aceite de oliva', 7, './fotosUsuario/1737989423pincho-de-cecina-y-queso-78-80-ud-aproximadas_Id-11436-600x400.jpg'),
(8, 'Chorizo a la Sidra', 'Chorizo cocido en sidra, una receta típica y llena de sabor asturiano.', 'Chorizo, sidra', 8, './fotosUsuario/1737989467Chorizo-a-la-sidra-1-600x400.webp'),
(9, 'Jamón Asado', 'Jugoso jamón cocido al horno con ajo y sal, perfecto para disfrutar con pan.', 'Jamón, sal, ajo', 1, './fotosUsuario/1737981138pincho_cerdo_adobado-scaled.jpg'),
(10, 'Pulpo a la Gallega', 'Pulpo cocido servido con pimentón, aceite de oliva y un toque de sal gruesa.', 'Pulpo, pimentón, sal, aceite de oliva', 2, './fotosUsuario/1737981253Pulpo-a-la-gallega-x400.jpg'),
(11, 'Ensalada de Pimientos', 'Pimientos asados acompañados de ajo y un chorrito de aceite de oliva.', 'Pimientos, aceite de oliva, ajo', 3, './fotosUsuario/1737981385B69F94DB-16FA-4622-9229-5490E51EFA3F-600x400.jpg'),
(12, 'Croquetas Caseras', 'Croquetas crujientes por fuera y cremosas por dentro, rellenas de jamón.', 'Leche, harina, jamón', 4, './fotosUsuario/1737981486bowl-with-croquettes-napkin-defused-background-600x400.jpg'),
(13, 'Bocadillo de Lomo', 'Un bocadillo sencillo pero delicioso de lomo de cerdo, pan y pimientos.', 'Lomo, pan, pimientos', 5, './fotosUsuario/1737989313bocadillo-de-lomo-con-pimientos-11-600x400.jpg'),
(14, 'Ensaladilla Rusa', 'Una ensalada fría de patata, mayonesa, atún y guisantes, perfecta como tapa.', 'Patata, mayonesa, atún, guisantes', 6, './fotosUsuario/1737989404mayyonaise-vegetable-salad-salted-tasty-inside-white-plate-along-with-bread-loafs-fork-daytime-600x400.jpg'),
(15, 'Montadito de Salchichón', 'Pequeño bocadillo con salchichón, pan y queso, ideal para picar.', 'Salchichón, pan, queso', 7, './fotosUsuario/1737989448Montadito_de_Salchichon_de_Lomo-600x400.jpg'),
(16, 'Pincho Moruno', 'Brochetas de carne de cordero marinada con especias, asadas a la parrilla.', 'Carne de cordero, especias', 8, './fotosUsuario/1737828849maxresdefault.jpg'),
(17, ' Patatas Bravas', ' Trozos de patatas fritas acompañadas de una salsa brava ligeramente picante y ajo, con un toque de ', 'Patatas, salsa brava, ajo, pimentón', 1, './fotosUsuario/1737981202patatas-bravas-2.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `bares`
--
ALTER TABLE `bares`
  ADD PRIMARY KEY (`id_bar`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tapas`
--
ALTER TABLE `tapas`
  ADD PRIMARY KEY (`id_tapa`),
  ADD KEY `bar` (`bar`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `bares`
--
ALTER TABLE `bares`
  MODIFY `id_bar` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `tapas`
--
ALTER TABLE `tapas`
  MODIFY `id_tapa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tapas`
--
ALTER TABLE `tapas`
  ADD CONSTRAINT `tapas_ibfk_1` FOREIGN KEY (`bar`) REFERENCES `bares` (`id_bar`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
