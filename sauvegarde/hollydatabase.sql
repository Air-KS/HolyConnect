-- Active: 1690186897191@@127.0.0.1@3306
-- MySQL dump 10.13  Distrib 8.1.0, for macos13.3 (x86_64)
--
-- Host: localhost    Database: hollyconnect_data
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `homelocation`
--

DROP TABLE IF EXISTS `homelocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `homelocation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location_id` int DEFAULT NULL,
  `name_location` varchar(255) DEFAULT NULL,
  `info_location` varchar(255) DEFAULT NULL,
  `post` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT NULL,
  `updated_at` timestamp DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_location_id` (`location_id`),
  KEY `idx_id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `homelocation`
--

LOCK TABLES `homelocation` WRITE;
/*!40000 ALTER TABLE `homelocation` DISABLE KEYS */;
/*!40000 ALTER TABLE `homelocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `coordinates` point NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations_homelocation`
--

DROP TABLE IF EXISTS `locations_homelocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations_homelocation` (
  `locations_id` int NOT NULL,
  `homelocation_location_id` int NOT NULL,
  PRIMARY KEY (`locations_id`,`homelocation_location_id`),
  KEY `homelocation_location_id` (`homelocation_location_id`),
  CONSTRAINT `locations_homelocation_ibfk_1` FOREIGN KEY (`locations_id`) REFERENCES `locations` (`id`),
  CONSTRAINT `locations_homelocation_ibfk_2` FOREIGN KEY (`homelocation_location_id`) REFERENCES `homelocation` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations_homelocation`
--

LOCK TABLES `locations_homelocation` WRITE;
/*!40000 ALTER TABLE `locations_homelocation` DISABLE KEYS */;
/*!40000 ALTER TABLE `locations_homelocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location_id` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `picture` longblob,
  `body` text,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT NULL,
  `updated_at` timestamp DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note_homelocation`
--

DROP TABLE IF EXISTS `note_homelocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note_homelocation` (
  `note_id` int NOT NULL,
  `homelocation_location_id` int NOT NULL,
  PRIMARY KEY (`note_id`,`homelocation_location_id`),
  KEY `homelocation_location_id` (`homelocation_location_id`),
  CONSTRAINT `note_homelocation_ibfk_1` FOREIGN KEY (`note_id`) REFERENCES `note` (`id`),
  CONSTRAINT `note_homelocation_ibfk_2` FOREIGN KEY (`homelocation_location_id`) REFERENCES `homelocation` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note_homelocation`
--

LOCK TABLES `note_homelocation` WRITE;
/*!40000 ALTER TABLE `note_homelocation` DISABLE KEYS */;
/*!40000 ALTER TABLE `note_homelocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `usersinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usersinfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `dateofbirth` int NOT NULL,
  `phonenumber` varchar(20) NOT NULL,
  `adressline1` varchar(255) NOT NULL,
  `adressline2` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `mylocation` varchar(255) NOT NULL,
  `is_owner` tinyint(1) DEFAULT NULL,
  `created_at` timestamp  DEFAULT NULL,
  `updated_at` timestamp  DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `usersinfo` WRITE;
/*!40000 ALTER TABLE `usersinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `usersinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo_homelocation`
--

DROP TABLE IF EXISTS `usersinfo_homelocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usersinfo_homelocation` (
  `usersinfo_id` int NOT NULL,
  `homelocation_id` int NOT NULL,
  PRIMARY KEY (`usersinfo_id`,`homelocation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo_homelocation`
--

LOCK TABLES `usersinfo_homelocation` WRITE;
/*!40000 ALTER TABLE `usersinfo_homelocation` DISABLE KEYS */;
/*!40000 ALTER TABLE `usersinfo_homelocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `users_id` int AUTO_INCREMENT NOT NULL,
  `Email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `last_login` timestamp NOT NULL,
  `login_attempts` int DEFAULT 5,
  `lockout_until` timestamp,
  `access_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT NULL,
  `updated_at` timestamp DEFAULT NULL,
  PRIMARY KEY (`users_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`users_id`) REFERENCES `usersinfo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-15 17:41:58
