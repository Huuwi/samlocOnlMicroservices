
const services = {
    cardGameService: process.env.cardGameService.split("---xxx---"),
    createFileService: process.env.createFileService.split("---xxx---"),
    gachaGamesService: process.env.gachaGamesService.split("---xxx---"),
    lobbyMoveAndChatService: process.env.lobbyMoveService.split("---xxx---"),
    userService: process.env.userService.split("---xxx---"),
}

module.exports = services