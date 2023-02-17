const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThoughts,
  updateThoughts,
  deleteThoughts,
} = require('../../controllers/thoughtsController.js');


router.route('/').get(getThoughts).post(createThoughts);


router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThoughts)
  .delete(deleteThoughts);

module.exports = router;
