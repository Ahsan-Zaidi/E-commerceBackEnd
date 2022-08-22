const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//route to find all tags w included attributes
router.get('/', (req, res) => {
  Tag.findAll({
    include:
    [
      {
        model:Product,
        attributes: ['product_name', 'price', 'stock']
      }
    ]
  }).then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

//route to find one specific tag by id with its attributes
router.get('/:id', (req, res) => {
  Tag.findOne({
    where:
    {
      id:req.params.id
    },
    include:
    [
      {
        model:Product,
        attributes: ['product_name', 'price', 'stock']
      }
    ]
  }).then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

//route to create a new tag 
router.post('/', (req, res) => {
  Tag.create({
    tag_name:req.body.tag_name
  }).then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

//route to update a tag by id
router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where:
    {
      id: req.params.id
    }
  }).then(tagData => {
    if(!tagData) {
      res.status(400).json({ message: 'No tag found with this id'});
      return;
    }
    res.json(tagData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

//route to delete a tag by id
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where:
    {
      id:req.params.id
    }
  }).then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id'});
    }
    res.json(tagData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

//export the file
module.exports = router;