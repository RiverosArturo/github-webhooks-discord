import { Request, Response } from "express";
import { DiscordService, GithubService } from "../services";

export class GithubController {

    constructor(
        private readonly githubService: GithubService,
        private readonly discordService: DiscordService,
    ){}

    webhookHandler = ( req:Request, res: Response ) => {
        const githubEvent = req.header('x-github-event') ?? 'unknown';
        // const signature = req.header('x-hub-signature-256') ?? 'unknown';
        const payload = req.body;
        let message:string;

        //log para crear interfaces
        // console.log(JSON.stringify(payload));
        switch( githubEvent ){

            case 'star':
                message = this.githubService.onStar( payload );
            break;
            case 'issues':
                message = this.githubService.onIssue( payload );
            break;

            default:
                message = `Unknown event ${githubEvent}`;

        }

        // console.log({ message });
        this.discordService.notify(message)
            .then( () => res.status(202).send('Accepted'))
            .catch( () => res.status(500).json({ error: 'Internal server error'}));


        // res.status(202).json('Accepted');
    }
}