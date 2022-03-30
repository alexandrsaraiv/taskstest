const {Router} = require('express');
const router = Router();

const {renderAbout, renderIndex, renderAll } = require('../controllers/index.controllers');

router.get('/', renderIndex )

router.get('/about', renderAbout )

router.get('/notes/public-notes', renderAll)

module.exports=router;