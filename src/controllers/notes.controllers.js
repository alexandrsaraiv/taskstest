const { redirect } = require('express/lib/response');
const res = require('express/lib/response');

const notesCtrl = {};
const Note = require('../models/Note')

notesCtrl.renderNoteForm = (req, res) => {
    res.render('./notes/new-note')
};

notesCtrl.createNewNote = async (req, res) => {
    const {title, description} = req.body;
    const newNote = new Note({title: title, description: description});
    newNote.user = req.user.id;
    await newNote.save();
    req.flash('success_msg','Tarefa adicionada com sucesso!');
    res.redirect('/notes')
}

notesCtrl.renderNote = async(req, res) => {
    
    const notes = await Note.find({user: req.user.id}).sort({createdAt:'desc'}).lean();
    res.render('./notes/all-notes', {notes})
}

notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    if(note.user != req.user.id){
        req.flash('error_msg','Usuário não autorizado!');
        return res.redirect('/notes');
    }
    res.render('./notes/edit-note', {note})
}

notesCtrl.updateNote =  async (req, res) => {
    const {title, description} = req.body;
     await Note.findByIdAndUpdate(req.params.id,{title: title, description:description});
     req.flash('success_msg','Tarefa alterada com sucesso!');
     res.redirect('/notes')
}

notesCtrl.deleteNote = async (req, res) => { 
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg','Tarefa apagada com sucesso!');
    res.redirect('/notes')
}

notesCtrl.renderAllNote = async(req, res) => {
    const notes = await Note.find().lean();
    res.render('/notes/public-note', {notes})
}


module.exports = notesCtrl;