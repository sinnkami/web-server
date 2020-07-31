DROP DATABASE IF EXISTS `sinnkami-web`;
CREATE DATABASE `sinnkami-web`;
USE `sinnkami-web`;

CREATE TABLE `Entries` (
	`entryId` int not null auto_increment,
	`author` varchar(30) CHARACTER SET utf8mb4,
	`title` varchar(30) CHARACTER SET utf8mb4,
	`content` text CHARACTER SET utf8mb4,
	`post` boolean,
	`createAt` datetime,
	`updateAt` datetime,
	PRIMARY KEY(`entryId`)
);

CREATE TABLE `Tag` (
	`tagId` int not null auto_increment,
	`name` varchar(30) CHARACTER SET utf8mb4,
	PRIMARY KEY (`tagId`)
);

CREATE TABLE `EntryTag` (
	`entryId` int not null,
	`tagId` int not null,
	PRIMARY KEY(`entryId`, `tagId`)
);

CREATE TABLE `Category` (
	`categoryId` int not null auto_increment,
	`name` varchar(20) CHARACTER SET utf8mb4,
	PRIMARY KEY(`categoryId`)
);

CREATE TABLE `EntryCategory` (
	`entryId` int not null,
	`categoryId` int not null,
	PRIMARY KEY(`entryId`, `categoryId`)
);

CREATE TABLE `Comment` (
	`commentId` int not null auto_increment,
	`author` varchar(30) CHARACTER SET utf8mb4,
	`content` text CHARACTER SET utf8mb4,
	`createAt` datetime,
	`ip` varchar(15) not null,
	`device` varchar(255) CHARACTER SET utf8mb4,
	PRIMARY KEY(`commentId`)
);

CREATE TABLE `EntryComment` (
	`entryId` int not null,
	`commentId` int not null,
	PRIMARY KEY(`entryId`, `commentId`)
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
