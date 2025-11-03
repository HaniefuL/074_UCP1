module.exports = (sequelize, DataTypes) => {
    const Buku = sequelize.define("Buku", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        judul: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pengarang: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tahun_terbit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bidang: {
            type: DataTypes.STRING,
            allowNull: false
        }

    });
    return Buku;
}