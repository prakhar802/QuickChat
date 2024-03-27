import { Kafka , Producer} from "kafkajs";
import fs from "fs";
import path from "path";
// import prismaClient from "./prisma";

 const kafka = new Kafka({
   brokers: [process.env.BROKER],
  ssl: {
    ca: [fs.readFileSync(path.resolve("./ca.pem"), "utf-8")],
  },
  sasl: {
    username: "avnadmin",
    password: process.env.KAFKA_PASSWORD,
    mechanism: "plain",
  },
 });

 let producer: null | Producer = null;

export async function createProducer() {
 if (producer) return producer;
    const _producer = kafka.producer();
    await _producer.connect();
    producer = _producer;
    return producer;
}

export async function produceMessage(message: string) {
  const producer = await createProducer();
  await producer.send({
    messages: [{ key: `message-${Date.now()}`, value: message }],
    topic: "MESSAGES",
  });
  return true;
}

 export default kafka;
