//const { router } = require("../routes/index.routes");

const indexCtrl = {};

indexCtrl.renderIndex = (req,res) => {
    res.render('index')
};

indexCtrl.renderAbout = (req,res) => {
    res.render('about')
};
indexCtrl.renderAll = (req,res)=>{
    res.render('notes/public-notes')
}

module.exports = indexCtrl;