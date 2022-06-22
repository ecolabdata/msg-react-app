import { useJwtPayload } from "../../jwt"
import "./DonnezVotreAvis.css"

export const DonnezVotreAvis = () => {
    const payload = useJwtPayload();
    let href;
    if (payload?.userTestCampaign || payload?.name) {
        href = `https://airtable.com/shrZ61LDZn0adF26a?prefill_auth-test-user-campaign=${payload.userTestCampaign}&prefill_auth-name=${payload.name}&hide_auth-test-user-campaign=true&hide_auth-name=true`
    } else {
        href = 'https://airtable.com/shr2A0YbTvAwdrxub'
    }
    return <a  className="avis rm-link-underline" href={href} target="_blank">
        Donnez votre avis !
    </a>
}