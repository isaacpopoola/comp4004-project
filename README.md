# comp4004-project

Install latest stable version of Node.js (12.x worked for us)
Install latest stable version of psql (postgres) 

cd into frontend directory
    - npm i

cd into backend directory
    - npm i 


How to run the application

    - start postgres
    - run psql
        - inside psql, run "create database cms;" and run "create database test_cms;"
    - in backend directory, run npm start
    - in frontend directory, run npm start

Login credentials
    
    - Admin user
        username: admin     password: admin
    
    - Student user
        username: ryanuan   password: pw

How to run frontend tests
    - make sure database is running
    - cd into backend directory, run npm start 
    - cd into frontend directory, run npm start 
    - in frontend directory, run npm run-script cypress
        - this will boot up cypress and you can run the tests inside the browse popup
***IMPORTANT*** this generates a code coverage file in frontend/coverage/lcov-report/index.html

How to run backend tests
    - run psql
        - inside psql, run "create database test_cms;"
    - in backend directory, run npm test
    *** IMPORTANT** sometimes you might see "Sequelize error", just re-run npm test until it works

How to run complex test scenarios (grid row 84 onwards)

    *** IMPORTANT *** RE-RUN "npm start" in backend before each of these test, this will reset to a fresh version the database
    - make sure database is running
    - cd into frontend directory, run npm start
    - inside front directory, run node test84.js
    - after this one, run node test104.js
    - after this one, run node test108.js

How to run test coverage

    BACKEND:
    - make sure database is rurnning
    - run npm run-script coverage
    - the coverage file will be in backend/coverage/lcov-report/index.html
