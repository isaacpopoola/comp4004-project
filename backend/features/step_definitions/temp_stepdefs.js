const assert = require('assert');
const { Given, When, Then } = require('cucumber');

const app = require("../../app");
const request = require("supertest");

Given('Express Server is running and address is {string}', function (address) {    //checks if the server is running, page doesn't exist...but the server works
    this.address = address;

    request(app)
        .get("/")
        .then(resp => {
            assert.ok;
        })
        .catch(err =>{
            assert.fail;
        })
});

When('Username is {string}', function (username) {    
    this.username = username;
});


When('Password is {string}', function (password) {
    this.password = password
});

When('Full name is {string}', function (name) {   
    this.name = name;
});

When('Type of user is {string}', function (type) {    
    this.type = type;
});

When('Data is sent to {string}', function (endpoint) {    
    this.endpoint = endpoint;
});

Then('New user is added to the database', function () {
    // axios.post(`${this.address}/${this.endpoint}`, data={username: this.username, password: this.password, fname: this.fname, lname: this.lname, type: this.type }).then(response => {
    //     assert.strictEqual(response.status, 201);
    //     assert.strictEqual(response.data.message, "User created successfully")
    //     console.log("okay")
    // }).catch(err => {
    //     assert.fail;
    //     console.log("fail")
    // })
    request(app)
    .post(`/${this.endpoint}?username=${this.username}&password=${this.password}&name=${this.name}&type=${this.type}`)
    .then(resp => {
        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.data.message, "User created successfully")        
    })
    .catch(err =>{
        assert.fail;
    })
});