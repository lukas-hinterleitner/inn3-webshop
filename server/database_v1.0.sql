-------------------------------------------------
-- DATABASE
-------------------------------------------------
-- drop old database
DROP DATABASE IF EXISTS `db_inn3_webshop`;

-- create new database
CREATE DATABASE `db_inn3_webshop`;

-- alter database - set default charset to utf8
ALTER DATABASE `db_inn3_webshop` CHARACTER SET utf8 COLLATE utf8_general_ci;

-------------------------------------------------
-- TABLES
-------------------------------------------------
CREATE TABLE IF NOT EXISTS `t_products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

-------------------------------------------------
-- DATA
-------------------------------------------------
INSERT INTO `t_products` (`name`, `description`, `price`, `created`) 
VALUES ('Echo Dot (4. Generation) | Smarter Lautsprecher mit Alexa',
        'Wir stellen vor: der neue Echo Dot – unser beliebtester smarter Lautsprecher mit Alexa. Das geradlinige, kompakte Design sorgt für satten Klang, dank klarem Sound und ausgewogener Basswiedergabe.',
        60.49, NOW());

