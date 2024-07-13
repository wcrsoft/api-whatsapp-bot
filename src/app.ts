import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from "@bot-whatsapp/bot"
import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys"

const flowBienvenida = addKeyword('hola').addAnswer('Buennas!! Bienvenido')

const main = async () => {

    const provider =  createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http?.server.post('/send-message', handleCtx( async (bot, req, res) =>{
        const body = req.body
        const message = body.message
        const mediaUrl = body.mediaUrl
        await bot.sendMessage('51996960606', message, {
            media: mediaUrl
        })
        console.log('Monche')
        res.end('esto es del server de polka')
    }))

    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })
}

main()