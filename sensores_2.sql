/*
Navicat MySQL Data Transfer

Source Server         : Local
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : sensores_2

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2018-09-14 16:42:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for datos
-- ----------------------------
DROP TABLE IF EXISTS `datos`;
CREATE TABLE `datos` (
  `id_dato` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `temperatura` double DEFAULT NULL,
  `nivel_agua` double DEFAULT NULL,
  `nivel_gasolina` double DEFAULT NULL,
  `velocidad` double DEFAULT NULL,
  `latitud` double DEFAULT NULL,
  `longitud` double DEFAULT NULL,
  `id_dispositivo` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`id_dato`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- ----------------------------
-- Table structure for dispositivos
-- ----------------------------
DROP TABLE IF EXISTS `dispositivos`;
CREATE TABLE `dispositivos` (
  `id_dispositivo` int(11) NOT NULL AUTO_INCREMENT,
  `dispositivo` varchar(50) NOT NULL,
  PRIMARY KEY (`id_dispositivo`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
