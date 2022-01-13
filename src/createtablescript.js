const createTable = `

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema Attendex
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Attendex
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS Attendex DEFAULT CHARACTER SET utf8 ;
USE Attendex ;

-- -----------------------------------------------------
-- Table Attendex.authentication
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Attendex.authentication (
  userID VARCHAR(25) NOT NULL,
  password VARCHAR(25) NOT NULL,
  PRIMARY KEY (userID),
  UNIQUE INDEX loginID_UNIQUE (userID ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table Attendex.attendancebook
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Attendex.attendancebook (
  userID VARCHAR(25) NOT NULL,
  bookName VARCHAR(45) NOT NULL,
  bookID INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (bookID),
  UNIQUE INDEX bookID_UNIQUE (bookID ASC) VISIBLE,
  INDEX userID_idx (userID ASC) VISIBLE,
  CONSTRAINT userID
    FOREIGN KEY (userID)
    REFERENCES Attendex.authentication (userID)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table Attendex.attendancesheet
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Attendex.attendancesheet (
  sheetID INT NOT NULL AUTO_INCREMENT,
  bookID INT NOT NULL,
  date VARCHAR(15) NOT NULL,
  PRIMARY KEY (sheetID),
  UNIQUE INDEX sheetID_UNIQUE (sheetID ASC) VISIBLE,
  INDEX bookID_idx (bookID ASC) VISIBLE,
  CONSTRAINT bookID
    FOREIGN KEY (bookID)
    REFERENCES Attendex.attendancebook (bookID)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table Attendex.members
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Attendex.members (
  bookID INT NOT NULL,
  memberName VARCHAR(45) NOT NULL,
  memberID INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (memberID),
  UNIQUE INDEX memberID_UNIQUE (memberID ASC) VISIBLE,
  INDEX sheetID (bookID ASC) VISIBLE,
  CONSTRAINT sheetID
    FOREIGN KEY (bookID)
    REFERENCES Attendex.attendancebook (bookID)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table Attendex.memberattendance
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Attendex.memberattendance (
  memberID INT NOT NULL,
  fk_sheetID INT NOT NULL,
  attended TINYINT NOT NULL,
  INDEX memberID_idx (memberID ASC) VISIBLE,
  INDEX sheetID_idx (fk_sheetID ASC) VISIBLE,
  CONSTRAINT fk_sheetID
    FOREIGN KEY (fk_sheetID)
    REFERENCES Attendex.attendancesheet (sheetID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT memberID
    FOREIGN KEY (memberID)
    REFERENCES Attendex.members (memberID)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;`


module.exports = createTable;
