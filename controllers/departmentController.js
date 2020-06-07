var express = require('express');
router = express.Router();
var Departament = require('../models/Department');
var Product = require('../models/Product');

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

router.delete('/:id', async (req, res) => {
  try {
    let id = req.params.id;
    let prods = await Product.find({ departments: id }).exec();

    if (prods.length > 0) {
      res.status(500).send({
        msg: 'Can not remove this department. You may have to fix its dependecies before.'
      })
    }
    else {
      await Departament.deleteOne({ _id: id });
      res.status(200).send({});
    }
  }
  catch (err) {
    res.status(500).send({ msg: "Internal error.", error: err })
  }
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