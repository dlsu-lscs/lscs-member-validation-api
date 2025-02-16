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
    "previous_scan": "January 01, 2000 at 12:00:00 AM",
    "time_remaining": 0,
    "status": "The member eligible."
}

// ineligible for discount
{
    "member_details": {
        "id": "12343765",
        "email": "rohann_dizon@dlsu.edu.ph",
        "full_name": "Rohann Gabriel Dizon",
        "committee_name": "Research and Development",
        "position_name": "Assistant Vice President",
        "division_name": "Internals"
    },
    "previous_scan": "January 01, 2000 at 12:00:00 AM",
    "time_remaining": 6,
    "status": "The member is ineligible."
}

// no entry yet
{
    "member_details": {
        "id": "12343765",
        "email": "rohann_dizon@dlsu.edu.ph",
        "full_name": "Rohann Gabriel Dizon",
        "committee_name": "Research and Development",
        "position_name": "Assistant Vice President",
        "division_name": "Internals"
    },
    "previous_scan": "Never scanned.",
    "time_remaining": "None",
    "status": "The member is eligible."
}
```
