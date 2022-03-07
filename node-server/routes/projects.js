const express = require('express');
const projectController = require('../controllers/project');
const isAuth = require('../middleware/is-auth');
const router = express.Router();

router.get('/', isAuth, projectController.index);
router.post('/', isAuth, projectController.create);
router.get('/:id', isAuth, projectController.get);
router.put('/:id', isAuth, projectController.update);
router.delete('/:id', isAuth, projectController.delete);

module.exports = router;