const express = require("express")
const Log = require("../models/log")
const router = express.Router()


router.get('/logs', async (req, res) => {
    try {
      const foundLog = await Log.find({});
      res.status(200).render('Index', {
        log: foundLog,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  });
router.get('/logs/new', (req, res) => {
    res.render("New")
  });
  
router.delete('/logs/:id', async (req, res) => {
  try {
    await Log.findByIdAndDelete(req.params.id); 
    res.status(200).redirect('/logs');
  } catch (err) {
    res.status(400).send(err);
  }
})
router.put('/logs/:id', async (req, res) => {
  console.log("Its working")
  try {
    if (req.body.shipIsBroken === 'on') {
      req.body.shipIsBroken = true;
    }
    else {
      req.body.shipIsBroken = false;
    }
    const updatedLog = await Log.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      {new: true})
      res.redirect(`/logs/${req.params.id}`);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/logs', async (req, res) => {
    try {
      req.body.shipIsBroken = req.body.shipIsBroken === "on"
      const createLog = await Log.create(req.body);

      res.status(201).redirect("/logs")
    } catch (err) {
      console.log(err)
      res.status(400).send(err);
    }
  });
 
router.get('/logs/:id/edit', async( req, res ) => {
  try {
    
    const foundLog= await Log.findById(req.params.id);
    res.render('Edit', {
      log: foundLog 
    })
  } catch (err) {
    res.status(400).send(err);
  }
})

//SHOW
router.get('/logs/:id', async (req, res) => {
    try {
      const foundLogs = await Log.findById(req.params.id);
  
      res.render('Show', {
        log: foundLogs,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  });


  module.exports = router