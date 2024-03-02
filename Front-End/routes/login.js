const express = require('express');
const router = express.Router();
const { login } = require("../services/loginService")

router.post('/', (req, res) => {
    const { email, password } = req.body;
    const result = login(email, password);
    res.json(result);

});
router.get('/', function(req, res, next) {
    res.render('login');
});

module.exports = router;
