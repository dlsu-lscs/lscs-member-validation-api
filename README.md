# lscs-member-validation-api

This repository handles the backend for validating LSCS Members  

## Requirements
1. Requests are assumed as ID numbers (integer).

## Endpoints

### **POST `/claim`**
* requires `studentId` in req.body
* `request`:
```bash
curl -X POST http://tomo-scanner.app.dlsu-lscs.org/claim \
-H "Content-Type: application/json" \
-d '{"studentId": 12343765}'
```
* `response`:
```json
// successful scan
{
    "member_details": {
        "id": "12343765",
        "email": "rohann_dizon@dlsu.edu.ph",
        "full_name": "Rohann Gabriel Dizon",
        "committee_name": "Research and Development",
        "position_name": "Assistant Vice President",
        "division_name": "Internals"
    },
    "claim": "Member claim was recorded."
}

// not a member
{ 
  "error": "Student ID number is not an LSCS member"
}

// availing discount within invalid time bound (6 hours from previous scan)
{
  "error": "The member has used up their discount within the last 6 hours."
}
```

### **GET `/status`**
* returns status and details of the id scanned
* requires `studentId` in req.query
* `request`:
```bash
curl -X GET http://tomo-scanner.app.dlsu-lscs.org/status?studentId=<id> \
-H "Content-Type: application/json
```

* `response`:
```json
// eligible for discount
{
    "member_details": {
        "id": "12343765",
        "email": "rohann_dizon@dlsu.edu.ph",
        "full_name": "Rohann Gabriel Dizon",
        "committee_name": "Research and Development",
        "position_name": "Assistant Vice President",
        "division_name": "Internals"
    },
    "scanned_at": "January 01, 2000 at 12:00:00 AM",
}
```
