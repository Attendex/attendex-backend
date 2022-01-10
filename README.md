# Introduction
This is the backend of the attendance-management-system app.

# Tech Stacks used
1. Node.js (Express)
2. mysql2
3. MySQL database

# Enhanced Entity-Relationship Diagram
![Enhanced Entity Relationship Diagram](./assets/schema.jpg)

# Tables explained
1. `authentication` table
- contains login ID and passwords of all accounts
- primary key is `loginID`
2. `attendancebook` table
- meant to represent a group of sheets, for example, a module has 13 lessons over 13 weeks, each lesson would be 1 sheet while the collection of 13 sheets is called an attendance book
- contains loginID that this book belongs to, name of book, bookID
- primary key is `bookID`
- foreign key `loginID` references `LoginID` from `authentication` tables
3. `attendancesheet` table
- meant to represent 1 date of the attendance book
- contains sheetID, bookID that this sheet belongs to, and the date
- primary key is `sheetID`
- foreign key is `bookID` which references `bookID` from `attendancebook`
4. `members` table
- meant to represent the list of members that a book would contain, for example, a module could have 100 students taking it and all 100 students will have to turn up for each individual lesson (sheet)
- contains bookID, name of member, and memberID
- primary key is `memberID`
- foreign key is `bookID` which reference `bookID` from `attendancebook`
5. `memberattendance` table
- meant to represent a single dates attendance list, much like a checklist to check if attendees are present for 1 session
- contains sheetID that this date belongs to, memberID that this entry belongs to and whether the member in this sheet attended
- first foreign key is `memberID` which reference `memberID` from `members` table
- second foreign key is `fk_sheetID` which reference `sheetID` from `attendancesheet` table

# API Functions
1. Accounts
- create accounts
- delete accounts
- authenticate passwords
2. Attendance Book
- add book
- delete book
- get books
3. Attendance Sheet
- add sheet
- delete sheet
4. Members
- add member
- delete member
- get members
5. Member Attendance
- add member attendance
- update member attendance
- get member attendance
