import { useLocationChange } from "./useLocation";

declare global {
    interface Window { _paq: any; }
}

export const useTrackPage = () => {
    useLocationChange((location) => {
        let _paq = window._paq = window._paq || [];
        const url = new URL(window.location.href);
        url.searchParams.delete("cardData")
        console.log("Matomo tracking page called", {_paq, referrer: document.referrer, url: url.href})
        _paq.push(['setReferrerUrl', document.referrer]);
        _paq.push(['setCustomUrl', url.href]);
        //_paq.push(['setDocumentTitle', 'My New Title']);

        _paq.push(['deleteCustomVariables', 'page']);
        _paq.push(['trackPageView']);

        // make Matomo aware of newly added content
        // var content = document.getElementById('content');
        // _paq.push(['MediaAnalytics::scanForMedia', content]);
        // _paq.push(['FormAnalytics::scanForForms', content]);
        // _paq.push(['trackContentImpressionsWithinNode', content]);
        _paq.push(['enableLinkTracking']);
    })
}
