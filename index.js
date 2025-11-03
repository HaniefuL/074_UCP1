const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

db.sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Database sync error:', err);
    })

app.post('/buku', async(req, res) => {
    const data = req.body;
    try {
        const buku = await db.Buku.create(data);
        res.status(201).json(buku);
    } catch (error) {
        res.send(error);
    }
});

app.get('/buku', async(req, res) => {
    try {
        const buku = await db.Buku.findAll();
        res.send(buku);
    } catch (error) {
        res.send(error);
    }
});

app.put('/buku/:id', async(req, res) => {
    const id = req.params.id;
    const data = req.body;

    try {
        const buku = await db.Buku.findByPk(id);

        if (!buku) {
            return res.status(404).send({ message: 'Buku tidak ditemukan' });
        }

        await buku.update(data);
        res.send({ message: 'Buku berhasil diupdate', buku });

    } catch (error) {
        res.status(500).send({ message: 'Terjadi kesalahan pada server', error });
    }
});

app.delete('/buku/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const buku = await db.Buku.findByPk(id);
        if (!buku) {
            return res.status(404).send({ message: 'Buku tidak ditemukan' });
        }
        await buku.destroy();
        res.send({ message: 'Buku berhasil dihapus' });
    } catch (error) {
        res.status(500).send(error);
    }
});