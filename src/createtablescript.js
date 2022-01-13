const createTable = `

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Create schema if doesnt exist
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS attendex DEFAULT CHARACTER SET utf8 ;
USE attendex ;

-- -----------------------------------------------------
-- Table attendex.authentication
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS attendex.authentication (
  userID VARCHAR(15) NOT NULL,
  password VARCHAR(15) NOT NULL,
  PRIMARY KEY (userID),
  UNIQUE INDEX loginID_UNIQUE (userID ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table attendex.attendancebook
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS attendex.attendancebook (
  userID VARCHAR(15) NOT NULL,
  bookName VARCHAR(45) NOT NULL,
  bookID INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (bookID),
  UNIQUE INDEX bookID_UNIQUE (bookID ASC) VISIBLE,
  INDEX userID_idx (userID ASC) VISIBLE,
  CONSTRAINT userID
    FOREIGN KEY (userID)
    REFERENCES attendex.authentication (userID)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table attendex.attendancesheet
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS attendex.attendancesheet (
  sheetID INT NOT NULL AUTO_INCREMENT,
  bookID INT NOT NULL,
  date VARCHAR(15) NOT NULL,
  PRIMARY KEY (sheetID),
  UNIQUE INDEX sheetID_UNIQUE (sheetID ASC) VISIBLE,
  INDEX bookID_idx (bookID ASC) VISIBLE,
  CONSTRAINT bookID
    FOREIGN KEY (bookID)
    REFERENCES attendex.attendancebook (bookID)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table attendex.members
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS attendex.members (
  bookID INT NOT NULL,
  memberName VARCHAR(45) NOT NULL,
  memberID INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (memberID),
  UNIQUE INDEX memberID_UNIQUE (memberID ASC) VISIBLE,
  INDEX sheetID (bookID ASC) VISIBLE,
  CONSTRAINT sheetID
    FOREIGN KEY (bookID)
    REFERENCES attendex.attendancebook (bookID)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table attendex.memberattendance
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS attendex.memberattendance (
  memberID INT NOT NULL,
  fk_sheetID INT NOT NULL,
  attended TINYINT NOT NULL,
  INDEX memberID_idx (memberID ASC) VISIBLE,
  INDEX sheetID_idx (fk_sheetID ASC) VISIBLE,
  CONSTRAINT fk_sheetID
    FOREIGN KEY (fk_sheetID)
    REFERENCES attendex.attendancesheet (sheetID)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT memberID
    FOREIGN KEY (memberID)
    REFERENCES attendex.members (memberID)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;`

module.exports = createTable;
