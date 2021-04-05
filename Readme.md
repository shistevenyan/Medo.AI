# Medo Playground

## Purpose
* Example application to learn more about web, api, ui
* A starting point for discussion regarding enhancements, desgin decisions, architecture
* Working code that can be used in an interview context to demonstrate your problem solving skills. If you are being interviewed, we kindly ask the following since **integrity & collaboration** are very important here at Medo.
 1. Treat this codebase like a Playground. Investigate it, break it, refactor it, criticize it, improve it, learn something new.
 2. Show your work (preferably with git history & comments).  Break up your changes however you like but seeing your thought process and steps is appreciated.
 3. If you have worked on this example (or something similar) before or received help from someone else, please let your interview panel know. 
 4. Consider this an oppurtunity to evaluate code using your own filter.  Look at what changes you think are beneficial and be prepared to justify why - there is no perfect solution that I have discovered :-)
 5.  Be creative, even if you don't have working code, feel free to diagram, write pseudo code, talk through enhancements, point out possible flaws etc.  We are most interested in the decisions and thought process versus the correctness of the code.
 6. Don't hesitate to ask questions 
 
## Reading
### Basic
* Git
* NodeJS with Typescript
* Express JS
* React JS
* JSX/TSX

### Recommended
* Docker
* Database with NodeJS driver (Mysql or Mongo preferred)
* Cryptography (NodeJS implementation preferred)
* Webpack


### Topics for Discussion - (Good to have)
* Security
  * Is using public/private key encryption good for user passwords? 
* Scalability/Redundancy/Performance
* Multiplatform Deployment
  * We develop/deploy on multiple platforms, how can we maintain consistency?
* Code management, linting, standards
* Usability/UI Design
* Testing (Unit, functional, user, automated)
* Data validation, schemas, ORM
* Networking
* Threading, concurrency, asynchronous processing
* Queuing & Eventual Consistency
* Database architecture
* Mobile applications

## Setup/Requirements

### [NodeJS](https://nodejs.org/) >= 12
#### NVM (Recommended if you don't have a NodeJS package manager)

**Mac/Linux NVM Installation**

[https://github.com/nvm-sh/nvm#installing-and-updating](https://github.com/nvm-sh/nvm#installing-and-updating)

* `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash`

**Windows NVM Installation**

[https://docs.microsoft.com/en-us/windows/nodejs/setup-on-windows](https://docs.microsoft.com/en-us/windows/nodejs/setup-on-windows)

**WSL2/Cygwin/MINGW Installation**
These installations are not recommended (we ran into a number of roadblocks with the `bash` terminal, configurations, and the inability to configure existing Python3 installations to name a few). A Windows NVM Installation is preferable. [This](./wsl2.md) is as far as we got.
  
### [Docker](https://docs.docker.com/get-docker/) (if using database storage engines)

## Compilation/Running
* Install dependencies `npm install`
* Watch for code changes (best done in a separate terminal) `npm run-script watch`
* Run application `npm start`

## Intended Web API
|Endpoint|Method|Description|Input/Output|
|--------|------|-----------|:-------|
|/api/login|POST|Login to application| Input: `{id: string, password: string}` Output: `{message: string, token: string}`}
|/api/initialize|POST|Reset data|Input: None, Output: Success message|
|/api/patients|GET|List all patients|Output: `PatientData[]`|
|/api/patients/:id|GET|Get Patient by id|Output: `PatientData`|
|/api/patients/:id|POST|Save Patient by id|Input: `PatientData`|

* Other than `/api/login`, all other endpoints expect an `Authorization` header to be supplied with a valid token (from `/api/login`).  
* These opertaions are considered successful if the response status code is <400.  
* Data interchange format is assumed to be JSON unless otherwise stated

## Task
Successfully start the application without errors.

## Further Tasks
There are many `TODO:` and `QUESTION:` comments you might want to think about during your code review.

### Basic
* Login to app (user: `jim`, password: `Hendrix`), reload data
* Edit patient information using UI
* Ensure data is saved
* Switch between `DATA_SOURCE` (InMemory, LocalData)
* What is user `bob`'s password?
* Make UI/Style enhancements
* Add timestamps to log output

### Intermediate
* Unit tests for backend/frontend
* Add Cancel button to Patient Editor
* Make session tokens survive application restart
* Add change password functionality for logged in user

### Advanced
* Implement `DATA_SOURCE` using Mysql, Mongo or other database backend running in a docker container
* Implement React state management such as Redux or Reflux
