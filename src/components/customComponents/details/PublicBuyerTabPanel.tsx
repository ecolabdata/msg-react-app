import React from 'react';
import GenericPagination from '../../dsfrComponents/GenericPagination';

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
  const PAGE_SIZE = 10;
  const [page, setPage] = React.useState(0);

  return (
    <>
      <p className="font-semibold my-4 text-right">{contents?.length} résultats</p>
      {contents?.length ? (
        <div className="fr-container--fluid flex flex-col items-center">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contents.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map((decpItem) => (
              <li key={decpItem.id}>
                <CPVCard content={decpItem} />
              </li>
            ))}
          </ul>
          {contents.length > PAGE_SIZE && (
            <GenericPagination
              className="mt-8"
              numberOfPages={Math.ceil(contents.length / PAGE_SIZE)}
              pageNumber={page}
              setPageNumber={setPage}
              title="Pagination liste des DECP"
            />
          )}
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
    <div className="fr-card h-full w-full bg-input-background">
      <div className="fr-card__body ">
        <div className="fr-card__content">
          <h3 className="fr-card__title"></h3>
          <div className="fr-card__desc flex flex-col flex-1 ">
            <p className="font-bold">{objet}</p>
            <div className="mt-auto">
              <div className="flex justify-between my-4">
                <p>
                  <span className="font-bold">Durée: </span>
                  {dureeMois} mois
                </p>
                <p>
                  <span className="font-bold">Procedure: </span>
                  {procedure}
                </p>
              </div>
              <p>
                <span className="font-bold">Montant: </span>
                {montant} €
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
