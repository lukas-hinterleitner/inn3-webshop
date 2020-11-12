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
  `intern_article_code` VARCHAR(32) NOT NULL UNIQUE,
  `img_name` VARCHAR(255) NOT NULL,
  `amount` INT(5) NOT NULL,
  `created` DATETIME NOT NULL,
  PRIMARY KEY(`id`)
);

CREATE TABLE IF NOT EXISTS `t_users`(
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
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
  `intern_article_code`,
  `img_name`,
  `amount`,
  `created`
) VALUES
('Echo Dot (4. Generation) | Smarter Lautsprecher mit Alexa', 'Wir stellen vor: der neue Echo Dot – unser beliebtester smarter Lautsprecher mit Alexa. Das geradlinige, kompakte Design sorgt für satten Klang, dank klarem Sound und ausgewogener Basswiedergabe.', 60.49, 'sml01', 'sml01.jpg', 10, NOW()),
('Apple iPad Air (10,5 Zoll, Wi-Fi, 64GB) - Space Grau', 'Das neue iPad. Es ist dein digitales Notizbuch, dein mobiles Büro, dein Fotostudio, deine Spielkonsole und dein persönliches Kino. Mit dem A12 Bionic Chip, der genug Power für wichtige Apps und faszinierende Games hat. So kannst du Dokumente bearbeiten, während du online etwas recherchierst und gleichzeitig deine Kollegen über FaceTime anrufst. Mit dem Apple Pencil kannst du besonders leicht Notizen machen.', 369.50, 'ipad01', 'ipad01', 15, NOW()),
('Samsung GALAXY S10 prism black G973F 128 GB Android 9.0', 'Das Galaxy S10 bietet ein Erlebnis, das einen neuen Standard für Smartphones setzen kann. Mit seinen neuen Features und der Ausstattung ist es besser als jedes bisherige Galaxy. Sie können Filme auf dem beeindruckenden Display anschauen, professionell aussehende Bilder schießen und Videos mit der Action Cam-Videostabilisierung aufnehmen. Dabei können Sie das Smartphone dank ausdauerndem Akku völlig sorgenfrei benutzen.', 571.00, 'samgal01', 'samgal01.jpg', 8, NOW()),
('Lenovo ThinkPad T490s', 'Wie alle ThinkPads wurde auch das T490s auf zwölf militärische Spezifikationen getestet und mehr als 200 Qualitätstests unterzogen, um sicherzugehen, dass es selbst unter Extrembedingungen reibungslos funktioniert. Ob arktische Wildnis, Wüstensandstürme, Schwerelosigkeit, Spritzwasser oder Erschütterungen – dieses Notebook lässt Sie nicht im Stich, was immer auch kommen mag. ', 1532.00, 'thinkp01', 'thinkp01.jpg', 13, NOW()),
('Apple iPhone SE 64 GB Schwarz', 'Das iPhone SE ist das leistungsstärkste 4,7"iPhone aller Zeiten. 1 Es hat den A13 Bionic, den schnellsten Smartphone Chip, für unglaubliche Leistung für Apps, Spiele und Fotografie. Porträtmodus für Porträts in Studioqualität und sechs Lichteffekte. Smart HDR der nächsten Generation für unglaubliche Details in den hellen und dunklen Bereichen. 4K Video in kinoreifer Qualität. Und alle erweiterten Funktionen von iOS. Mit einer langen Batterielaufzeit 2 und Wasserschutz 3 bekommst du viel von dem, was du am iPhone liebst, in einer kleineren Größe.', 466.90, 'iphone01', 'iphone01.jpg', 20, NOW()),
('DELL UltraSharp U2719D 68,6cm (27") WQHD Profi-Monitor HDMI/DP 99% sRGB', ' Makellose Details: Jedes Bild erwacht auf diesem 68,6cm (27")-Bildschirm zum Leben. Dank QHD mit einer Auflösung von 2.560 x 1.440 erhalten Sie 1,77 Mal mehr Details als bei Full HD. Der UltraSharp Monitor ist werksseitig auf 99 % sRGB kalibriert. Mit einem Delta-E-Wert unter 2 werden von Anfang an präzise Farben erzielt. Außerdem sehen Sie mit 99% Rec709 und 85% DCI-P3 Farbdeckung lebensechte Farben in Videoformaten.  Durch die In-Plane Switching (IPS)-Technologie werden konsistente, lebendige Farben über einen weiten Betrachtungswinkel ermöglicht.', 339.00, 'dellm01', 'dellm01.jpg', 8, NOW());
