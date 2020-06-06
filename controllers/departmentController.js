var express = require('express');
router = express.Router();
var Departament = require('../models/Department');

router.post('/', function (req, res) {
  console.log(req.body);
  let d = new Departament({ name: req.body.name });
  d.save((err, dep) => {
    if (err)
      res.status(500).send(err);
    else
      res.status(200).send(dep);
  })
})

router.get('/', function (req, res) {
  Departament.find().exec((err, deps) => {
    if (err)
      res.status(500).send(err);
    else
      res.status(200).send(deps);
  })

})

module.exports = router;