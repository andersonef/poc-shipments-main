# POC - Simple Shipments System

![Diagram](https://raw.githubusercontent.com/andersonef/poc-shipments-main/main/.github/assets/diagram.png)

This is a POC (Proof of Concept) which has the objective to be a simple CRUD using Next.js with node and react.
This system has two pages:

 - Index: will show a table with all shipments and their consolidated data on the database
 - Create: will allow the user to create a shipment just inputing 4 informations.

On the backend we have:
 - GET /shipments: will return a list of all shipments from the database
 - POST /shipments/create: will store a shipment on the database and publish a message to rabbitmq notifying that a shipment was created

 ## Submodules
 This project needs some submodules to work with. Each submodule is an independent microservice with their own database, stack and even infrastructure.

 In this repository you'll get:
  - Frontend
  - Consolidation backend (app)
  - Consolidation database (app)
  - Rabbitmq container

Submodules microservices:
