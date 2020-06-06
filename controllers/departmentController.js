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

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  Departament.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.log('deu pau aqui');
      res.status(500).send(err);
    }
    else
      res.status(200).send({});
  })
})

router.patch('/:id', (req, res) => {
  Departament.findById(req.params.id, (err, dep) => {
    if (err)
      res.status(500).send(err);
    else if (!dep)
      res.status(404).send({})
    else {
      dep.name = req.body.name;
      dep.save()
        .then((d) => res.status(200).send(d))
        .catch((e) => res.status(500).send(e));
    }
  })
})

module.exports = router;