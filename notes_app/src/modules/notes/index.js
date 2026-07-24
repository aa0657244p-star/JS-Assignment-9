var router = require('express').Router();
var controller = require('./notes.controller');
var authMiddleware = require('../../common/auth.middleware');

router.use(authMiddleware);

router.post('/', controller.createNote);

router.patch('/all', controller.updateAllNotesTitle);
router.put('/replace/:id', controller.replaceNote);
router.delete('/', controller.deleteAllNotes);
router.get('/note-by-content', controller.getNoteByContent);
router.get('/note-with-user', controller.getNotesWithUserInfo);
router.get('/aggregate', controller.getNotesAggregate);
router.get('/paginate-sort', controller.getPaginatedNotes);

router.patch('/:id', controller.updateNote);
router.delete('/:id', controller.deleteNote);
router.get('/:id', controller.getNoteById);

module.exports = router;