const assert = require('assert');
const axios = require('axios').default;
const { Given, When, Then } = require('@cucumber/cucumber');
// const { response } = require('../../server');

Given(/^Express Server is running and address is {string}$/, function (address) {
    //checks if the server is running, page doesn't exist...but the server works
    this.address = address;
    // axios.get(address).then((response) => {
    //     assert.strictEqual(response.status, 404);
    // })
});

When(/^Username is {string}$/, function (username) {
    this.username = username;
});


When(/^Password is {string}$/, function (password) {
    this.password = password
});

When(/^First name is {string} and Last name is {string}$/, function (fname, lname) {
   this.fname = fname;
   this.lname = lname;
});

When(/^Type of user is {string}$/, function (type) {
    this.type = type;
});

When(/^I send this data to {string}$/, function (endpoint) {
    this.endpoint = endpoint;
});

Then(/^New user is added to the database$/, function () {
    axios.post(this.address+this.endpoint, data={username: this.username, password: this.password, fname: this.fname, lname: this.lname, type: this.type }).then(response => {
        assert.strictEqual(response.status, 201);
        assert.strictEqual(response.data.message, "User created successfully");
    })
});