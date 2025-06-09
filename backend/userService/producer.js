const amqp = require("amqplib")


const main = async () => {

    const conn = await amqp.connect("amqp://localhost")
    const channel = await conn.createChannel()

    const exchange = "my-exchange"

    channel.assertExchange(exchange, "direct")

    channel.publish(exchange, "createPdf", Buffer.from(JSON.stringify({
        task: "doing",
        version: 1.0
    }))) // routing key : createPdf

    setTimeout(() => {
        conn.close()
        process.exit(0)
    }, 200);

}


main()