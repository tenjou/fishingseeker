import { ChannelType, Client, Collection, GatewayIntentBits, Partials } from "discord.js"
import config from "../config.json"
import WebSocket from "ws"

interface ClientEx extends Client {
    commands: Collection<string, any>
}

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Message, Partials.Channel],
}) as ClientEx

client.once("ready", () => {
    console.log(`Logged in as ${client.user!.tag}!`)

    const channel = client.channels.cache.get(config.channel_id)
    if (channel && channel.type === ChannelType.GuildText) {
        // channel.send("Tenjou just caught a Sardine (0.4m)")
    } else {
        console.error("Channel not found or not a text-based channel.")
    }
})

client.login(config.token)

client.on("messageCreate", async (message) => {
    console.log("message", message.content, message.channelId)
    if (message.channelId !== config.channel_id) {
        return
    }

    if (message.content === "!fish") {
        message.channel.send("Chilllllllll")
    }

    if (message.content === "test") {
        console.log(message.channelId)
    }

    if (message.content === "!channels") {
        const guild = message.guild // Get the guild where the message was sent
        if (!guild) return

        // Fetch all channels in the guild
        const channels = guild.channels.cache // This returns a collection of channels

        // Log channel names and their types
        channels.forEach((channel) => {
            console.log(`Channel Name: ${channel.name}, Type: ${channel.type}`)
        })

        // Optional: Send a message listing all channel names
        const channelNames = channels.map((channel) => channel.name).join(", ")
        message.channel.send(`Channels in this server: ${channelNames}`)
    }
})

const wss = new WebSocket.Server({
    port: 8080,
})

wss.on("connection", (ws) => {
    ws.on("error", console.error)

    ws.on("message", function message(data) {
        console.log("received: %s", data)
    })

    ws.send("something")
})
