// for use in mysql workbench to view data

const sqltestscripts = `

SELECT * FROM attendex.authentication;
SELECT * FROM attendex.attendancebook;
SELECT * FROM attendex.attendancesheet;
SELECT * FROM attendex.memberattendance;
SELECT * FROM attendex.members;

ALTER TABLE attendex.members AUTO_INCREMENT = 0 ;
ALTER TABLE attendex.attendancebook AUTO_INCREMENT = 0 ;
ALTER TABLE attendex.attendancesheet AUTO_INCREMENT = 0 ;

`