const express = require('express')
const app = express();
const PORT = 3000;
const db = require('./models');
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.listen(PORT, () => {
    console.log('Server started on port 3000');
})

db.sequelize.sync()
    .then((result) => {
        app.listen(3000, () => {
            console.log('Server Started');
        })
    })
    .catch((err) => {
        console.log(err);
    })

    app.post("/buku", async (req, res) => {
        const data = req.body;
        try {
            const buku = await db.Buku.create(data);
            res.send(buku);
        } catch (err) {
            res.send(err);
        }
    });

    app.get('/buku', async (req, res) => {
        try {
            const buku = await db.Buku.findAll();
            res.send(buku);
        }catch (err) {
            res.send(err);
        }
    });

    app.put('/buku/:id', async (req, res) => {
        const id = req.params.id;
        const data = req.body;

        try {
            const buku = await db.Buku.findByPk(id);
            if (!buku) {
                return res.status(404).send({ message: 'buku tidak ditemukan' });
            }

            await buku.update(data);
            res.send({ message: 'buku berhasil diupdate', buku });
        } catch (err) {
            res.status(500).send(err);
        }
    });

        app.delete('/buku/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const buku = await db.buku.findByPk(id);
            if (!buku) {
                return res.status(404).send({ message: 'buku tidak ditemukan'});
            }

            await buku.destroy();
            res.send({ message: 'buku berhasil dihapus' });
        } catch (err) {
            res.status(500).send(err);
    }
    });
