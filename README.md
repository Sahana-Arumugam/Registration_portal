# Registration Portal

A web application that enables users to register their details through a simple and responsive interface. This application is part of a two-portal system consisting of a **Registration Portal** and an **Admin Portal**, both connected to a shared MongoDB database.

When users submit their information, the data is securely stored in MongoDB and becomes immediately available to administrators through the Admin Portal.

---

## Live Demo

**Registration Portal**

https://registration-portal-jet.vercel.app/
---

## System Overview

This project consists of two independent web applications:

### Registration Portal (Current Repository)

* Allows users to submit registration details.
* Validates user input.
* Stores registration data in a shared MongoDB database.

### Admin Portal

* Retrieves registration data from the same database.
* Allows administrators to securely view and manage user registrations.

Both applications communicate with the same backend infrastructure, ensuring real-time synchronization between user submissions and administrator access.

---

## Architecture

```text
Users
   │
   ▼
Registration Portal
   │
   ▼
Node.js + Express API
   │
   ▼
MongoDB Atlas
   ▲
   │
Admin Portal
   │
Administrators
```

---

## Tech Stack

* React + Vite
* Node.js
* Express.js
* MongoDB Atlas
* Mongoose



---

## Related Project

**Admin Portal**

GitHub:
https://github.com/Sahana-Arumugam/admin_portal

Live:
https://admin-portal-gamma-plum.vercel.app/

---

