-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: concesionarias2
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.27-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `autos`
--

DROP TABLE IF EXISTS `autos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `marca` varchar(100) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `anio` int(11) NOT NULL,
  `color` varchar(25) NOT NULL,
  `sucursalId` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `autos_FK` (`sucursalId`),
  CONSTRAINT `autos_FK` FOREIGN KEY (`sucursalId`) REFERENCES `sucursales` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autos`
--

LOCK TABLES `autos` WRITE;
/*!40000 ALTER TABLE `autos` DISABLE KEYS */;
INSERT INTO `autos` VALUES (1,'volkswagen','scirocco',2016,'black',1,500000),(2,'Peugeot','207',2020,'red',1,300000),(3,'chevrolet','cruze',2020,'white',1,0),(4,'nissan','x-trail',2020,'brown',1,0),(5,'chevrolet','onix',2017,'white',1,0),(6,'renault','kangoo',2016,'black',1,0),(7,'audi','a3',2020,'black',1,0),(8,'volkswagen','golf',2020,'gray',1,0),(9,'volkswagen','golf',2020,'gray',1,0),(10,'volkswagen','golf',2020,'gray',1,0),(11,'volkswagen','golf',2020,'gray',1,0),(12,'volkswagen','golf',2020,'gray',1,0),(13,'volkswagen','golf',2020,'gray',1,0),(14,'volkswagen','golf',2020,'gray',1,0),(15,'fiat','toro',2019,'black',2,0),(16,'volkswagen','vento',2019,'black',2,0),(17,'ford','focus',2014,'blue',2,0),(18,'ford','fiesta',2010,'white',2,0),(19,'nissan','x-trail',2020,'brown',2,0),(20,'chevrolet','onix',2017,'white',2,0),(21,'volkswagen','amarok',2020,'black',2,0),(22,'volkswagen','golf',2020,'gray',2,0),(23,'volkswagen','golf',2020,'gray',2,0),(24,'volkswagen','golf',2020,'gray',2,0),(25,'volkswagen','golf',2020,'gray',2,0),(26,'ferrari','f40',1996,'black',5,0),(27,'volkswagen','golf',2020,'gray',2,0),(28,'volkswagen','amarok',2019,'white',3,0),(29,'volkswagen','amarok',2010,'gray',3,0),(30,'audi','tt',2019,'white',3,0),(31,'audi','tt',2012,'black',3,0),(32,'chevrolet','cruze',2018,'black',3,0),(33,'audi','q5',2018,'black',3,0),(34,'audi','q5',2015,'blue',3,0),(35,'chevrolet','camaro',2015,'red',3,0),(36,'renault','captur',2020,'orange',3,0),(37,'fiat','argo',2020,'white',3,0),(38,'renault','duster',2020,'gray',3,0),(39,'renault','sandero',2020,'blue',3,0),(40,'ford','ka',2020,'green',3,0),(41,'peugeot','partner',2020,'white',3,0),(42,'toyota','hilux',2020,'white',3,0),(43,'fiat','cronos',2020,'red',3,0),(44,'chevrolet','camaro',20120,'black',4,0),(45,'nissan','note',2020,'white',4,0),(46,'chevrolet','onix',2019,'red',4,0),(47,'volkswagen','scirocco',2015,'white',4,0),(48,'volkswagen','golf',2016,'white',4,0),(49,'nissan','sentra',2017,'black',4,0),(50,'citroen','c4',2020,'gray',4,0),(51,'citroen','berlingo',2020,'gray',4,0),(52,'peugeot','208',2020,'gray',4,0),(53,'fiat','fiorino',2020,'gray',4,0),(54,'toyota','etios',2020,'gray',4,0),(55,'ford','ecosport',2015,'red',4,0),(56,'chery','tiggo',2020,'gray',4,0),(57,'renault','sandero',2020,'gray',4,0),(58,'nissan','note',2018,'red',5,0),(59,'chevrolet','camaro',2018,'white',5,0),(60,'chevrolet','onix',2016,'gray',5,0),(61,'honda','civic',2020,'black',5,0),(62,'audi','a6',2016,'red',5,0),(63,'nissan','x-trail',2016,'gray',5,0),(64,'peugeot','2008',2020,'green',5,0),(65,'toyota','hilux',2020,'gray',5,0),(66,'volkswagen','saveiro',2020,'blue',5,0),(67,'fiat','golf',2020,'gray',5,0),(68,'fiat','palio',2017,'white',5,0),(69,'peugeot','307',2020,'gray',5,0),(70,'renault','sandero',2020,'gray',5,0),(83,'prueba','Matias',1234,'blue',5,0),(84,'prueba','Matias',1233,'123',3,500000),(85,'prueba','Matias',1234,'blue',5,450000),(86,'prueba','Matias',1234,'blue',5,123);
/*!40000 ALTER TABLE `autos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenes`
--

DROP TABLE IF EXISTS `imagenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file` varchar(100) NOT NULL,
  `autoId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `imagenes_FK` (`autoId`),
  CONSTRAINT `imagenes_FK` FOREIGN KEY (`autoId`) REFERENCES `autos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenes`
--

LOCK TABLES `imagenes` WRITE;
/*!40000 ALTER TABLE `imagenes` DISABLE KEYS */;
INSERT INTO `imagenes` VALUES (1,'auto.jpg',1),(2,'auto1.jpg',2),(3,'auto2.jpg',3),(4,'auto3.jpg',4),(5,'auto4.jpg',5),(6,'auto5.jpg',6),(7,'auto.jpg',7),(8,'auto1.jpg',8),(9,'auto2.jpg',9),(10,'auto3.jpg',10),(11,'auto4.jpg',11),(12,'auto5.jpg',12),(13,'auto.jpg',13),(14,'auto1.jpg',14),(15,'auto2.jpg',15),(16,'auto3.jpg',16),(17,'auto4.jpg',17),(18,'auto5.jpg',18),(19,'auto.jpg',19),(20,'auto1.jpg',20),(21,'auto2.jpg',21),(22,'auto3.jpg',22),(23,'auto4.jpg',23),(24,'auto5.jpg',24),(25,'auto.jpg',25),(26,'auto1.jpg',26),(27,'auto2.jpg',27),(28,'auto3.jpg',28),(29,'auto4.jpg',29),(30,'auto5.jpg',30),(31,'auto.jpg',31),(32,'auto1.jpg',32),(33,'auto2.jpg',33),(34,'auto3.jpg',34),(35,'auto4.jpg',35),(36,'auto5.jpg',36),(37,'auto.jpg',37),(38,'auto1.jpg',38),(39,'auto2.jpg',39),(40,'auto3.jpg',40),(41,'auto4.jpg',41),(42,'auto5.jpg',42),(43,'auto.jpg',43),(44,'auto1.jpg',44),(45,'auto2.jpg',45),(46,'auto3.jpg',46),(47,'auto4.jpg',47),(48,'auto5.jpg',48),(49,'auto.jpg',49),(50,'auto1.jpg',50),(51,'auto2.jpg',51),(52,'auto3.jpg',52),(53,'auto4.jpg',53),(54,'auto5.jpg',54),(55,'auto.jpg',55),(56,'auto1.jpg',56),(57,'auto2.jpg',57),(58,'auto3.jpg',58),(59,'auto4.jpg',59),(60,'auto5.jpg',60),(61,'auto.jpg',61),(62,'auto1.jpg',62),(63,'auto2.jpg',63),(64,'auto3.jpg',64),(65,'auto4.jpg',65),(66,'auto5.jpg',66),(67,'auto.jpg',67),(68,'auto1.jpg',68),(69,'auto2.jpg',69),(70,'auto3.jpg',70),(71,'auto1.jpg',83),(72,'auto2.jpg',83),(73,'1658274666891_img_.png',83),(74,'1658947722266_img_.jpg',84),(75,'1658947722269_img_.jpg',84),(76,'1658947722271_img_.jpg',84),(77,'1659530113956_img_.jpg',85),(78,'1659530113962_img_.jpg',85),(79,'1659530113963_img_.png',85),(80,'1660673163654_img_.jpg',86),(81,'1660673163658_img_.png',86),(82,'1660673163660_img_.png',86);
/*!40000 ALTER TABLE `imagenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sucursales`
--

DROP TABLE IF EXISTS `sucursales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sucursales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sucursales`
--

LOCK TABLES `sucursales` WRITE;
/*!40000 ALTER TABLE `sucursales` DISABLE KEYS */;
INSERT INTO `sucursales` VALUES (1,'3 de Febrero','Caseros 1678, B1678 Caseros Partido de Tres de Febrero, Provincia de Buenos Aires',123456789,'sucursal.jpg'),(2,'Pilar','Au Panamericana KM 51, B1629 Pilar, Provincia de Buenos Aires',123363,'sucursal.jpg'),(3,'Lanus','Remedios de Escalada de San Martín 1584, B1822AAD Lanús Oeste, Provincia de Buenos Aires',0,'sucursal.jpg'),(4,'Quilmes','Av. Hipólito Yrigoyen 80, B1878 Quilmes, Provincia de Buenos Aires',0,'sucursal.jpg'),(5,'San Miguel','Av. Pres. Juan Domingo Perón 2043, B1663 San Miguel, Provincia de Buenos Aires',0,'sucursal.jpg');
/*!40000 ALTER TABLE `sucursales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `rol` varchar(25) NOT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Matias','Lopez','matias@gmail.com','$2a$10$pwqkrn6i9HmKDJtVBqIA5e/ha.OcL8eW4BNncyXLzX3p6JunJR63G','default-image.png','admin',NULL,NULL),(23,'matias','adf','asd@asd.asd','$2a$10$EKJg6mhZcWDHPf0Wu2d6WuRzqJCF9QsvNxuXqlaRu4aVRqcTvGetC','default-image.png','user',NULL,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'concesionarias2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-10 20:05:33
