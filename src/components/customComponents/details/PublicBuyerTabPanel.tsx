export type Decp = {
  id: string;
  source: string;
  uid: string;
  _type: string;
  objet: string;
  codeCPV: string;
  dureeMois: number;
  dateNotification: string;
  datePublicationDonnees: string;
  montant: number;
  formePrix: number;
  modifications: string[];
  nature: string;
  procedure: string;
  dateSignature: string;
  dateDebutExecution: string;
  valeurGlobale: string;
  montantSubventionPublique: number;
  donneesExecution: string;
  uuid: string;
  lieuExecution_code: string;
  lieuExecution_typeCode: string;
  lieuExecution_nom: string;
};

interface PublicBuyerPanelContentProps {
  contents: Decp[];
}

export const PublicBuyerPanelContent: React.FC<PublicBuyerPanelContentProps> = ({ contents }) => {
  return (
    <>
      {contents?.length ? (
        <div className="fr-container--fluid">
          <ul className="grid grid-cols-2 gap-3">
            {contents.map((decpItem) => (
              <li key={decpItem.id}>
                <CPVCard content={decpItem} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        "Pas d'éléments à afficher"
      )}
    </>
  );
};

export default PublicBuyerPanelContent;

interface CPVCardProps {
  content: Decp;
}

const CPVCard: React.FC<CPVCardProps> = ({ content }) => {
  const { codeCPV, dureeMois, procedure, montant, objet } = content;
  return (
    <div className="fr-card h-full w-full">
      <div className="fr-card__body ">
        <div className="fr-card__content">
          <h3 className="fr-card__title"></h3>
          <div className="fr-card__desc flex flex-col flex-1 ">
            <p className="font-bold">{objet}</p>
            <div className="mt-auto">
              <div className="flex justify-between mb-2">
                <p>
                  <span className="font-bold">Durée: </span>
                  {dureeMois}
                </p>
                <p>
                  <span className="font-bold">Procedure: </span>
                  {procedure}
                </p>
              </div>
              <p>
                <span className="font-bold">Montant: </span>
                {montant}
              </p>
            </div>
          </div>
          <div className="fr-card__start">
            <ul className="fr-tags-group" aria-hidden={true}>
              <li>
                <p
                  className={`fr-badge fr-badge--sm bg-red-marianne-625-lightBackground text-red-marianne-625`}>
                  Code CPV: {codeCPV}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
