
const test_endpoint = (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
}

module.exports = {
    test_endpoint
};
