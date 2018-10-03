/*
Navicat MySQL Data Transfer

Source Server         : NIBEMI
Source Server Version : 50559
Source Host           : 34.223.215.43:3306
Source Database       : sensores_2

Target Server Type    : MYSQL
Target Server Version : 50559
File Encoding         : 65001

Date: 2018-10-03 13:01:33
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- ----------------------------
-- Records of datos
-- ----------------------------
INSERT INTO `datos` VALUES ('13', '2018-09-14', '17:58:00', '45', '12.12', '40', '95', '-0.218229', '-78.517339', '9');
INSERT INTO `datos` VALUES ('14', '2018-09-14', '17:58:27', '44.5', '12.1', '39.45', '92.5', '-0.218229', '-78.517339', '9');
INSERT INTO `datos` VALUES ('15', '2018-09-21', '12:42:32', '0', '0', '0', '0', '0', '0', '12');
INSERT INTO `datos` VALUES ('16', '2018-09-21', '12:43:01', '0', '0', '0', '0', '0', '0', '12');
INSERT INTO `datos` VALUES ('17', '2018-09-21', '13:26:15', '42', '15', '15.7', '94', '0', '0', '');
INSERT INTO `datos` VALUES ('18', '2018-09-21', '13:26:28', '42', '15', '15.7', '94', '0', '0', '5');
INSERT INTO `datos` VALUES ('19', '2018-09-21', '13:48:48', '42', '15', '15.7', '94', '0', '0', '5');
INSERT INTO `datos` VALUES ('20', '2018-09-21', '13:49:14', '75', '15', '15.7', '94', '0', '0', '5');
INSERT INTO `datos` VALUES ('21', '2018-09-21', '13:49:26', '42', '15', '15.7', '94', '0', '0', '5');
INSERT INTO `datos` VALUES ('22', '2018-09-21', '13:49:56', '99', '15', '15.7', '94', '0', '0', '5');
INSERT INTO `datos` VALUES ('23', '2018-09-21', '13:52:48', '99', '15', '15.7', '94', '0', '0', '9');
INSERT INTO `datos` VALUES ('24', '2018-09-21', '13:58:18', '99', '15', '15.7', '94', '-0.218229', '-0.21824', '9');
INSERT INTO `datos` VALUES ('25', '2018-09-21', '13:58:36', '99', '15', '15.7', '94', '-0.218229', '-0.21824', '9');
INSERT INTO `datos` VALUES ('26', '2018-09-21', '14:00:53', '50', '15', '15.7', '94', '-0.218229', '-0.21824', '9');
INSERT INTO `datos` VALUES ('27', '2018-09-21', '14:13:26', '50', '15', '15.7', '94', '-0.218229', '-0.21824', '9');
INSERT INTO `datos` VALUES ('28', '2018-09-21', '14:13:29', '50', '15', '15.7', '94', '-0.218229', '-0.21824', '9');
INSERT INTO `datos` VALUES ('29', '2018-09-21', '14:17:13', '99', '15', '15.7', '94', '-0.218229', '-0.21824', '9');
INSERT INTO `datos` VALUES ('30', '2018-09-21', '14:19:40', '50', '15', '15.7', '94', '-0.218229', '-0.21824', '9');
INSERT INTO `datos` VALUES ('31', '2018-09-21', '14:19:56', '50', '15', '20', '94', '-0.218229', '-0.21824', '9');
INSERT INTO `datos` VALUES ('32', '2018-09-21', '14:26:52', '50', '15', '15.7', '94', '-0.218229', '-0.21824', '9');

-- ----------------------------
-- Table structure for dispositivos
-- ----------------------------
DROP TABLE IF EXISTS `dispositivos`;
CREATE TABLE `dispositivos` (
  `id_dispositivo` int(11) NOT NULL AUTO_INCREMENT,
  `dispositivo` varchar(50) NOT NULL,
  PRIMARY KEY (`id_dispositivo`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of dispositivos
-- ----------------------------
INSERT INTO `dispositivos` VALUES ('9', 'VEHICULO');
