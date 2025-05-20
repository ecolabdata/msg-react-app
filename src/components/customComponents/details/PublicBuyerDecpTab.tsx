import React from 'react';
import GenericPagination from '../../dsfrComponents/GenericPagination';
import { PublicBuyer } from 'api2/Api';
import { PublicBuyerCard } from 'apiv4/interfaces/publicBuyer';

interface PublicBuyerDecpTabProps {
  contents: PublicBuyerCard['decp'];
}

export const PublicBuyerDecpTab: React.FC<PublicBuyerDecpTabProps> = ({ contents }) => {
  const PAGE_SIZE = 10;
  const [page, setPage] = React.useState(0);

  return (
    <>
      <p className="font-semibold my-4 text-right">{contents?.length} résultats</p>
      {contents?.length ? (
        <div className="container--fluid flex flex-col items-center">
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

interface CPVCardProps {
  content: PublicBuyerCard['decp'][number];
}

const CPVCard: React.FC<CPVCardProps> = ({ content }) => {
  const { codeCPV, dureeMois, procedure, montant, objet } = content;
  return (
    <div
      className={`fr-card h-full w-full  ${
        localStorage.getItem('scheme') === 'dark' ? 'bg-input-background' : ''
      }`}>
      <div className="fr-card__body ">
        <div className="fr-card__content">
          {/* <h3 className="fr-card__title"></h3> Commented because it creates an empty heading error */}
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
                  className={`fr-badge fr-badge--sm`}
                  style={
                    localStorage.getItem('scheme') === 'dark'
                      ? { color: 'rgb(249, 92, 94)', backgroundColor: 'rgb(44, 32, 43)' }
                      : { color: 'rgb(44, 32, 43)', backgroundColor: 'rgb(249, 92, 94)' }
                  }>
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
