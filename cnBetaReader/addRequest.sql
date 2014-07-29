-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.13 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             8.3.0.4694
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for mixi
CREATE DATABASE IF NOT EXISTS `mixi` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mixi`;


-- Dumping structure for table mixi.tb_news_requestlog
CREATE TABLE IF NOT EXISTS `tb_news_requestlog` (
  `RequestLogID` varchar(50) NOT NULL,
  `URL` varchar(2000) NOT NULL,
  `HttpMethod` varchar(10) DEFAULT NULL,
  `StatusCode` int(11) DEFAULT NULL,
  `UserAgent` varchar(2000) DEFAULT NULL,
  `Referer` varchar(2000) DEFAULT NULL,
  `InsertedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for procedure mixi.usp_News_AddRequest
DELIMITER //
CREATE DEFINER=`root`@`localhost` PROCEDURE `usp_News_AddRequest`(IN `URL` varchar(2000), IN `Method` varchar(10), IN `StatusCode` INT, IN `UserAgent` varchar(2000), IN `Referer` varchar(2000))
BEGIN

	INSERT INTO tb_News_requestlog values(uuid(), URL,Method,StatusCode,UserAgent,Referer, now());
	
END//
DELIMITER ;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
