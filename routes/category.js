const router = require('express').Router();
const categoryController = require('../controllers/categoryController');
const {verifyAndAuthorization , verifyVendor ,verifyAdmin } =require('../middleware/verifyToken');






router.put('/:id', verifyAdmin , categoryController.updateCategory);
router.delete('/:id', verifyAdmin , categoryController.deleteCategory);
router.post('/', verifyAdmin , categoryController.createCategory);
router.post('/image/:id',verifyAdmin ,categoryController.patchCategoryImage);

router.get('/' ,categoryController.getAllCategory);
router.get('/random',categoryController.getRandomCategory);


module.exports = router;
