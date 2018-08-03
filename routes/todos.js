const express = require('express');
const router = express.Router();

router.get('/', (req, res ) => {
    res.send('something get');
})
router.post('/', (req, res ) => {
    res.send('something post');
})
router.delete('/', (req, res ) => {
    res.send('something delete');
})
router.put('/', (req, res ) => {
    res.send('something put');
})

module.exports = router;