import client, { Channel, Connection } from "amqplib";

async function createConnection(): Promise<Channel | undefined> {
  try {
    const connection: Connection = await client.connect(
      "amqp://navi:navi1234@localhost:5672"
    );
    const channel: Channel = await connection.createChannel();
    closeConnection(channel, connection); // This will register process.on("SIGINT") event listener
    console.info("RabbitMQ Connection created");
    return channel;
  } catch (error) {
    console.log(error);
    console.error("Unable to connect to rabbitMQ ");
    return undefined;
  }
}

function closeConnection(channel: Channel, connection: Connection): void {
  process.on("SIGINT", async () => {
    await channel.close();
    await connection.close();
    console.info("RabbitMQ Connection closed");
  });
}

export default createConnection;

createConnection();
