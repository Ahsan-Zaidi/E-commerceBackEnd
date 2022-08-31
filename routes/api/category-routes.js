const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//find all categories
//include all of its additional properties
router.get('/', (req, res) => {
  Category.findAll(
    {
      include: [
        {
          model: Product,
          attributes: ['product_name', 'price', 'stock']
        }
      ]
    }).then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

//Find one category by id
//include all of its additional properties
router.get('/:id', (req, res) => {
  Category.findOne({
    where:
    {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name','price','stock']
    }
  }).then(categoryData => {
    if(!categoryData) {
      res.status(404).json({ message: 'No category found matching this id' });
      return;
    }
    res.json(categoryData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

//create a category 
router.post('/', (req, res) => {
  Category.create({
    category_name:req.body.category_name
  }).then(categoryData => res.json(categoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

//update a category by finding its id
router.put('/:id', (req, res) => {
  Category.update({
    category_name: req.body.category_name
  },
    {
      where:
      {
        id: req.params.id
      }
    }).then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No category found matching this id' });
        return;
      }
      res.json(categoryData);
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

//delete a category by id
router.delete('/:id', (req, res) => {
  Category.destroy({
    where:
    {
      id: req.params.id
    }
  }).then(categoryData => {
    if (!categoryData) {
      res.status(404).json('No category found matching this id ');
      return;
    }
    res.json(categoryData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

//export the route file
module.exports = router;