const { Router } = require('express')
const router = Router()

const { 
    renderNoteForm, 
    createNewNote, 
    renderNote, 
    renderEditForm, 
    updateNote, 
    deleteNote,
    renderAllNote } = require('../controllers/notes.controllers');

const {isAuthenticated} = require('../helpers/auth')


//New Note
router.get('/notes/add', isAuthenticated, renderNoteForm);

router.post('/notes/new-note', isAuthenticated, createNewNote);

//Get ALL NOTE
router.get('/notes',isAuthenticated, renderNote);
router.get('/notes/public-notes', renderAllNote);

//edit notes
router.get('/notes/edit/:id', isAuthenticated, renderEditForm)

router.put('/notes/edit/:id', isAuthenticated, updateNote)

//Delete Notes

router.delete('/notes/delete/:id',isAuthenticated,  deleteNote)

module.exports = router
