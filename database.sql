DROP DATABASE IF EXISTS `sinnkami-web`;
CREATE DATABASE `sinnkami-web`;
USE `sinnkami-web`;
CREATE TABLE `Entries` (
    `entryID` int not null auto_increment,
    `author` varchar(30) CHARACTER SET utf8mb4,
    `title` varchar(30) CHARACTER SET utf8mb4,
    `content` text CHARACTER SET utf8mb4,
    `createAt` datetime,
    `updateAt` datetime,
    PRIMARY KEY(`entryID`)
);

CREATE TABLE `Comment` (
    `commentID` int not null auto_increment,
    `entryID` int not null,
    `author` varchar(30) CHARACTER SET utf8mb4,
    `content` text CHARACTER SET utf8mb4,
    `createAt` datetime,
    `ip` varchar(15) not null,
    `device` varchar(255) CHARACTER SET utf8mb4,
    PRIMARY KEY(`commentID`)
);

CREATE TABLE `Category` (
    `categoryID` int not null auto_increment,
	`entryID` int not null,
    `name` varchar(20) CHARACTER SET utf8mb4,
    PRIMARY KEY(`categoryID`)
);

CREATE TABLE `AccsessLog` (
    `id` int not null auto_increment,
    `method` varchar(5) CHARACTER SET utf8mb4,
    `status` int,
    `url` varchar(255) CHARACTER SET utf8mb4,
    `responseTime` double,
    `ip` varchar(16) CHARACTER SET utf8mb4,
    `userAgent` text CHARACTER SET utf8mb4,
    `createAt` datetime,
    PRIMARY KEY(`id`)
);
