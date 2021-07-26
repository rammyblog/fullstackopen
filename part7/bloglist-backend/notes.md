- mongo mock can be used to mock the database
- Since our application's backend is still relatively simple, we will make the decision to test the entire application through its REST API, so that the database is also included. This kind of testing where multiple components of the system are being tested as a group, is called integration testing.
- The Promise.all method can be used for transforming an array of promises into a single promise, that will be fulfilled once every promise in the array passed to it as a parameter is resolved. The last line of code await Promise.all(promiseArray) waits that every promise for saving a note is finished, meaning that the database has been initialized.
- Mongo does not have the join feature, so we use populate