const { connection, connect } = require('../../db');

class UserController {
    
    view(req, res) {
        connection.query('SELECT * FROM user WHERE status = "active"', (err, data) => {

            if(err) {
                console.log(err);
            }
            else {
                let removeUser = req.query.removed;
                res.render('home', { data, removeUser });
            } 
        });
    }

    findUsers(req, res) {
        let searchTerm = req.body.search;
        const sqlQuery = 'SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?';
        const searchFor = ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'];

        connection.query(sqlQuery, searchFor, (err, data) => {
            if(err) {
                console.log(err);
            } 
            else {
                res.render('home', { data });
            }
        });

    }

    showForm(req, res) {
        res.render('add-user');
    }

    createUser(req, res) {
        const { first_name, last_name, email, phone, comments } = req.body;
        if( first_name === '' || last_name === '' || email === '') {
            res.render('add-user', { alert: 'Error. You need to fill in all the fields', typeMessage: 'warning'});
            return;
        }
        const sqlQuery = 'INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comment = ?';
        const userInfo = [first_name, last_name, email, phone, comments];
        connection.query(sqlQuery, userInfo, (err, data) => {
            if(err) {
                console.log(err);
            } 
            else { 
                res.render('add-user', { alert: 'User added.',  typeMessage: 'success'});
            }
        });

    }

    showEditUser(req, res) {
        const { id } = req.params;
        const sqlQuery = 'SELECT * FROM user WHERE id = ?';

        connection.query(sqlQuery, id, (err, data) => {

            if(err) {
                console.log(err);
            }
            else {
                res.render('edit-user', { data });
            } 
        });

    }

    updateUser(req, res) {
        const { id } = req.params;
        const { first_name, last_name, email, phone, comments } = req.body;

        const sqlQuery = 'UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comment = ? WHERE id = ?';
        const userInfo = [first_name, last_name, email, phone, comments, id];

        connection.query(sqlQuery, userInfo, (err, data) => {
            if(err) {
                console.log(err);               
            }
            else {
                const { id } = req.params;
                const sqlQuery = 'SELECT * FROM user WHERE id = ?';

                connection.query(sqlQuery, id, (err, data) => {
                    if(err) {
                        console.log(err);
                        res.render('edit-user', { data, alert: 'Error. User wasn\'t updated.', typeMessage: 'warning'});
                        return;
                    }
                    else {
                        res.render('edit-user', { data, alert: 'User updated.',  typeMessage: 'success'});
                    } 
                });
            } 
        });
    }

    deteleUser(req ,res) {

        const { id } = req.params;
        const sqlQuery = 'DELETE FROM user WHERE id = ?';

        connection.query(sqlQuery, id, (err, data) => {

            if(err) {
                console.log(err);
            }
            else {
                let removeUser = encodeURIComponent('User removed');
                res.redirect('/?removed=' + removeUser); 
            } 
        });

    }

    getUserDetails(req, res) {
        const { id } = req.params;
        const sqlQuery = 'SELECT * FROM user WHERE id = ?';

        connection.query(sqlQuery, id, (err, data) => {
            if(err) {
                console.log(err);
            }
            else {
                res.render('view-user', { data });
            } 
        });
    }
}

module.exports = new UserController()