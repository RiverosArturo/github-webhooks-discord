import { envs } from "../../config";


export class DiscordService {

    private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK_URL;

    constructor(){}

    async notify( message: string ){
        const body = {
            content: message,
            //Cada que se haga una accion en github se enviara un gif junto con el msj correspondiente
            embeds: [
                {
                    image: {
                        url: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN214anh1Zm52bmF1d3hkMjhqcHQyOXpmNWxhM2JxbzAwcm54NjZscCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TFPdmm3rdzeZ0kP3zG/giphy.gif'
                    }
                }
            ]
        }

        const resp = await fetch( this.discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if( !resp.ok ){
            console.log('Error sending message to discord');
            return false;
        }

        return true;
    }
}