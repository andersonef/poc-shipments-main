# POC - Simple Shipments System

## Requirements
In order to run this project on your environment, it will be needed to have installed:
 - node (version 16.15 or superior)
 - docker
 - make (common on most linux distros)

 ## Running

 Its quite simple to put this system online. You just need to clone it and run ```make up``` inside its directory. After that you'll have this available urls:

  - http://localhost:3000 - Frontend listing shipments
  - http://localhost:8080 - adminer panel 
    - Each microservice run in a different host, but the development credentials are all the same:
    - user: test / password: test
    - main service:
        - host: db
        - database: app
    - MS Aggregator microservice:
        - host: msaggrdb
        - database: app
    - MS ZipCode microservice:
        - host: zipcodedb
        - database: msdb
 - http://localhost:15672 - RabbitMQ admin panel
    - user: test
    - password: test

 ## Description

This is a simple system which allows you to register symbolic shipments and see them in a list on index page. 
The main app will have a frontend with a list and a form to register, an endpoint to list shipments from database and another endpoint to save a shipment into database after user submit the register form.

The differencial here is: You'll have inside the main service a Shipment table with 12 fields, but you'll manually fill only 4 of them: Via, Zip destination, volumes and shipment cost.

So, after you fill those fields, an event will be fired and the other 2 microservices will be listening to it, so each one of them will know when a shipment was created and they will do their logic. 

The MS Aggregator will aggregate and calculate the total cost and volumes of all shipments to a certain zip code. 

The MS ZipCode will find the address information about that zip code.

When each one of those microservices ends their function, they will send their output to rabbit as an event, which a worker from the main service will be listening to it, grabbing their output information and consolidating into its own database.

Here's a diagram of the entire structure:

![Diagram](https://raw.githubusercontent.com/andersonef/poc-shipments-main/main/.github/assets/diagram.png)

 - **Frontend, app-backend:** User interface and APIs to list and save shipments. The api used to save shipment is already a rabbit publisher. Made in react and node using Next.js framework and prisma orm. 
 - **Database app:** The database of main service. Postgresql. It has two tables, Via and Shipment. Shipment is a table containing consolidated information about shipments.
 - **App-worker:** Background worker which acts as a consumer of a queue from rabbitmq. It will listen to events triggered from ms aggregator and ms-zipcode microservices. Made in pure nodejs and prisma orm. This worker is part of the same codebase of frontend and app-backend.
 - **MS Aggregator:** Microservice responsible to listen to shipment created event and whenever a shipment is created, it calculate the total cost and total volumes to that zip code destination based on its own data and the recently created shipment. It has it's own database (db-aggr) which use postgresql.
 - **MS Zipcode:** Microservice responsible to listen to shipment created event and whenever a shipment is created, it gathers information about the address from that zip code destination.

 ## Screens
 ![List page](https://raw.githubusercontent.com/andersonef/poc-shipments-main/main/.github/assets/screen-index.png)
When you access http://localhost:3000 you'll see this page, showing some initial example data. To register a new shipment, just click on **Register new Shipment** on top menu.

![Create page](https://raw.githubusercontent.com/andersonef/poc-shipments-main/main/.github/assets/screen-create.png)
On this page you'll be able to register a new shipment. When you do it, a message will be sent to rabbitmq.

![Rabbit queues](https://raw.githubusercontent.com/andersonef/poc-shipments-main/main/.github/assets/screen-rabbit-queues.png)
When you access rabbitmq administration panel, you'll be able to see the queues working.
**WARNING:** You'll only be able to see it if you activate the microservices. The consumer creates the queues, so if you only activate the main service, the queues won't appears.

 ## Microservices
This project is a CRUD by itself and doesn't need another microservices to work, but if the following microservices are online, so this CRUD will gather more information about the shipments, such as total cost, total volumes, address information, etc.

The other microservices are:
 - https://github.com/andersonef/poc-entregas-msaggr
 - https://github.com/andersonef/poc-entregas-mszipcode

In order to deploy the entire structure on your development machine, you just need to clone all three repositories, so run ```make up``` on each one of them:

```shell
$ git clone git@github.com:andersonef/poc-shipments-main.git
$ cd poc-shipments-main
$ make up
$ cd ..
$ git clone git@github.com:andersonef/poc-entregas-mszipcode.git
$ cd poc-entregas-mszipcode
$ make up
$ cd ..
$ git clone git@github.com:andersonef/poc-entregas-msaggr.git
$ cd poc-entregas-msaggr
$ make up
```

It's done!
Now you have the entire structure from diagram above running on your machine.
