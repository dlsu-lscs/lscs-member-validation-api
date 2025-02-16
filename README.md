# lscs-tomo-api

This repository handles the backend for validating LSCS Members.

## Requirements
1. Requests are assumed as ID numbers (integer).

## Endpoints

### **GET `/validate`**
* returns member details should DLSU ID number pass lscs-auth
* requires `studentId` in req.query
* `request`:
```bash
curl -X GET http://tomo-scanner.app.dlsu-lscs.org/status?studentId=<id> \
-H "Content-Type: application/json
```

* `response`:
```json

"member_details": {
        "id": "12343765",
        "email": "rohann_dizon@dlsu.edu.ph",
        "full_name": "Rohann Gabriel Dizon",
        "committee_name": "Research and Development",
        "position_name": "Assistant Vice President",
        "division_name": "Internals"
    },


```
