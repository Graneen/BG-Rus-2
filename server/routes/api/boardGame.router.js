const express = require('express');
const router = express.Router();
const { BoardGame } = require('../../db/models'); 

router.get('/api/boardgames', async (req, res) => {
    try {
        const boardGames = await BoardGame.findAll(); 
        res.json(boardGames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

router.get('/api/boardgame/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const boardGame = await BoardGame.findOne({where: {id}}); 
        res.json(boardGame);
        console.log(boardGame)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

module.exports = router;