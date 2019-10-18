DROP DATABASE IF EXISTS `sinnkami-web`;
CREATE DATABASE `sinnkami-web`;
USE `sinnkami-web`;
CREATE TABLE `Entries` (
    `id` int not null auto_increment,
    `author` varchar(30) CHARACTER SET utf8mb4,
    `title` varchar(30) CHARACTER SET utf8mb4,
    `body` text CHARACTER SET utf8mb4,
    `create_at` datetime,
    `update_at` datetime,
    PRIMARY KEY(`id`)
);

CREATE TABLE `Comment` (
    `id` int not null auto_increment,
    `entryId` int not null,
    `author` varchar(30) CHARACTER SET utf8mb4,
    `body` text CHARACTER SET utf8mb4,
    `create_at` datetime,
    `ip` varchar(15) not null,
    `device` varchar(255) CHARACTER SET utf8mb4,
    PRIMARY KEY(`id`)
);

CREATE TABLE `Category` (
    `id` int not null auto_increment,
    `name` varchar(20) CHARACTER SET utf8mb4,
    `entryId` int not null,
    PRIMARY KEY(`id`)
);

CREATE TABLE `AccsessLog` (
    `id` int not null auto_increment,
    `method` varchar(5) CHARACTER SET utf8mb4,
    `status` int,
    `url` varchar(255) CHARACTER SET utf8mb4,
    `response_time` double,
    `ip` varchar(16) CHARACTER SET utf8mb4,
    `user_agent` text CHARACTER SET utf8mb4,
    `create_at` datetime,
    PRIMARY KEY(`id`)
);
