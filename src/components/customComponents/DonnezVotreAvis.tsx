import { useJwtPayload } from "../../jwt"

export const DonnezVotreAvis = () => {
    const payload = useJwtPayload();
    let href;
    if (payload?.userTestCampaign || payload?.name) {
        href = `https://airtable.com/shrhHngOUIL3Frwb5?prefill_auth-test-user-campaign=${payload.userTestCampaign}&prefill_auth-name=${payload.name}&hide_auth-test-user-campaign=true&hide_auth-name=true`
    } else {
        href = 'https://airtable.com/shrhHngOUIL3Frwb5'
    }
    return <a  className="rm-link-underline absolute top-0 right-0 left-20 mx-auto rounded-md w-fit py-2 px-3 bg-[#B8FEC9] text-black
    md:right-20 md:py-4 md:px-6
    dsfr-lg:top-auto dsfr-lg:left-auto dsfr-lg:bottom-0 dsfr-lg:right-6 dsfr-lg:m-0"
            href={href}
            target="_blank"
            rel="noreferrer">
        Donnez votre avis !
    </a>
}