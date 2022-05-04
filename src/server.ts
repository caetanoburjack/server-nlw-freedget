import express from 'express'

const app = express();

app.get('/', (req, res) => {
    return res.send('Deu bom!')
})

app.listen(3333, () => {
    console.log('Server is running!')
})