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
CREATE TABLE IF NOT EXISTS `t_products`(
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `img_name` VARCHAR(255) NOT NULL,
  `amount` INT(5) NOT NULL,
  `created` DATETIME NOT NULL,
  PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `t_users`(
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `pwd` VARCHAR(255) NOT NULL,
  `country` VARCHAR(100) DEFAULT NULL,
  `city` VARCHAR(100) DEFAULT NULL,
  `zip` INT DEFAULT NULL,
  `address` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY(`id`),
  UNIQUE(`email`)
);

CREATE TABLE IF NOT EXISTS `t_orders` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `product_id` INT(11),
  `product_price` DECIMAL(10, 2) NOT NULL,
  `amount` INT(5) NOT NULL,
  `order_datetime` DATETIME NOT NULL,
  PRIMARY KEY(`id`),
  FOREIGN KEY (`product_id`) REFERENCES `t_products`(`id`) 
);

-------------------------------------------------
-- DATA
-------------------------------------------------
INSERT INTO `t_products`(
  `name`,
  `description`,
  `price`,
  `img_name`,
  `amount`,
  `created`
)
VALUES(
  'Echo Dot (4. Generation) | Smarter Lautsprecher mit Alexa',
  'Wir stellen vor: der neue Echo Dot – unser beliebtester smarter Lautsprecher mit Alexa. Das geradlinige, kompakte Design sorgt für satten Klang, dank klarem Sound und ausgewogener Basswiedergabe.',
  60.49,
  '61q6kGO1QcL._AC_SX569_.jpg',
  10,
  NOW());
