const amqp = require("amqplib")

const main = async () => {

    const conn = await amqp.connect("amqp://localhost")
    const channel = await conn.createChannel()

    const exchange = "my-exchange"

    channel.assertExchange(exchange, "direct") // check exchange exists

    const q = await channel.assertQueue('', { exclusive: true, autoDelete: true });

    channel.bindQueue(queue, exchange, "createPdf")

    channel.consume(queue, (msg) => {
        let a = JSON.parse(msg.content.toString())
        console.log("nhan duoc msg : ", a);
    })


}


main()