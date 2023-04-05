const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
}
);


const categories = [
    { id: 1, name: 'Programming' },
    { id: 2, name: 'Data repositories' },
    { id: 3, name: 'Computer networks' },
];

app.get('/api/categories', (req, res) => {
    res.send(categories)
});

app.get('/api/categories/:id', (req, res) => {
    const category = categories.find(c => c.id == parseInt(req.params.id));

    if (!category) {
        return res.status(404)
        .send('Bunday ID\'ga ega bo\'lgan kategoriya topilmadi');
    } res.status(200).send(category);

});

app.post('/api/categories', (req, res) => {
    const result = schema.validate(req.body);
    if(result.error) {
        return res.status(400).send(result.error.details[0].message)
    }
    const category = {
        id: categories.length + 1,
        name: req.body.name
    };

    categories.push(category)

    res.status(201)
    .send(category);

});

app.put('/api/categories/:id', (req, res) => {
    const category = categories.find(c => c.id == parseInt(req.params.id));
    if(!category){
        return res.status(404)
        .send('Bunday ID\'ga ega bo\'lgan kategoriya topilmadi');
    }
    const result = schema.validate(req.body);
    if(result.error){
        res.status(400)
        .send(result.error.details[0].message)
    }
    category.name = req.body.name;

    res.status(200)
    .send(category);

});

app.delete('/api/categories/:id', (req, res) => {
    category = categories.find(c => c.id == req.params.id);
    if(!category){
        res.status(404)
        .send('Bunday ID\'ga ega bo\'lgan kategoriya topilmadi');
    }

    const categoryIndex = categories.indexOf(category);
    categories.splice(categoryIndex, 1);
    res.send(category);

});

const schema = Joi.object({
    name: Joi.string().required().min(3)
});