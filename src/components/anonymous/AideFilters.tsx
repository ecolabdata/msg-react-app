

export const AideFilters : React.FC = ({}) => {
    const [toggles, setToggles] = useState({
        "Afficher les aides permanentes": (initialQuery && initialQuery["Afficher les aides permanentes"] !== undefined) ? initialQuery["Afficher les aides permanentes"] : true
    });
    const [aid_type, setAid_type] = useState(initialQuery?.aid_type || "");
    const [echeance, setEcheance] = useState(initialQuery?.echeance || "");
}