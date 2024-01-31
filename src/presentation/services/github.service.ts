import { GithubIssuePayload, GithubStarPayload } from "../../interfaces";


export class GithubService {

    constructor(){}

    onStar( payload: GithubStarPayload ): string {

        const { action, sender, repository, starred_at } = payload;
        // console.log(starred_at);
        return `User ${sender.login} ${action} start on ${repository.full_name}`
    }

    onIssue( payload: GithubIssuePayload ){
        
        const {action, issue} = payload;

        if( action === 'opened' ){
            return `An issue was opened by ${ issue.user.login } with this title: ${ issue.title }`;
        }

        if( action === 'closed' ){
            return `An issue '${ issue.title }' was closed by ${ issue.user.login }`;
        }

        if( action === 'reopened' ){
            return `An issue '${ issue.title }' was reopened by ${ issue.user.login }`;
        }

        return `Unhandled action for the issue event ${ action }`;
    }
}