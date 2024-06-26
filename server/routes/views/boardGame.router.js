const express = require('express');
const router = express.Router();
const { User, BoardGame, Feedback, Estimation, FavoriteGames } = require('../../db/models'); 

router.get('/api/boardgames', async (req, res) => {
    const id = 1
    try {
        const boardGames = await BoardGame.findAll({
            include: {
                model: User,
                required: false,
                where: { id: Number(id)},
                attributes: ['name'],
                through: {
                    model: FavoriteGames,
                    attributes: ['toggler']
                }
            }
        }); 
        console.log(JSON.parse(JSON.stringify(boardGames)).filter((el) => el.id === 41))
        res.json(boardGames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

router.get('/api/boardgame/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const boardGame = await BoardGame.findOne({where: { id }});
        const estimationGame = await Estimation.findAll({where: { game_id: id }});  
        const feedBackGame = await Feedback.findAll({where: { game_id: id }});
        res.json({ boardGame, estimationGame, feedBackGame });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

module.exports = router;