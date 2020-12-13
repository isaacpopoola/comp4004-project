# comp4004-project

Install latest stable version of Node.js
Install latest stable version of psql 

cd into frontend directory
    - npm i

cd into backend directory
    - npm i 


How to run the application

    - start postgres
    - run psql
        - inside psql, run "create database cms;"
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
    - in frontend directory, run npm run-script cypress
        - this will boot up cypress and you can run the tests inside the browse popup

How to run backend tests
    - run psql
        - inside psql, run "create database test_cms;"
    - in backend directory, run npm test

How to run complex test scenarios (grid row 84 onwards)

    ***IMPORTANT*** RE-RUN "npm start" in backend before each of these test, this will reset to a fresh version the database ***IMPORTANT***
    - make sure database is running
    - cd into frontend directory, run npm start
    - inside front directory, run node test84.js
    - after this one, run node test104.js
    - after this one, run node test108.js

How to run test coverage
    - cd into backend directory, run ./testcoverage.sh
        - if you don't have proper permissions, run chmod 777 testcoverage.sh
    - the coverage file will be in backend/coverage/lcov-report/index.html

