DROP DATABASE If EXISTS lkredqueendb;
CREATE DATABASE lkredqueendb;
USE lkredqueendb;

CREATE TABLE players (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    lkname VARCHAR(100) NOT NULL,
    playerID VARCHAR(100) NOT NULL,
)

CREATE TABLE alliances (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    lkname VARCHAR(100) NOT NULL,
    allianceID VARCHAR(100) NOT NULL,
)

CREATE TABLE habitats (
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (id),
    lkname VARCHAR(100) NOT NULL,
    habitatID VARCHAR(100) NOT NULL,
)

-- SELECT * FROM allData;
-- LOAD DATA INFILE 'c:/tmp/discounts.csv' 
-- INTO TABLE discounts 
-- FIELDS TERMINATED BY ',' 
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;
