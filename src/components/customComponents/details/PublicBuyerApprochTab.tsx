import React from 'react';
import GenericPagination from '../../dsfrComponents/GenericPagination';
import { PublicBuyerCard } from 'apiv4/interfaces/publicBuyer';

interface PublicBuyerApprochTabProps {
  contents: PublicBuyerCard['approch_content'];
}

export const PublicBuyerApprochTab: React.FC<PublicBuyerApprochTabProps> = ({ contents }) => {
  const PAGE_SIZE = 10;
  const [page, setPage] = React.useState(0);
  return (
    <>
      <p className="font-semibold my-4 text-right">{contents?.length} résultats</p>
      {contents?.length ? (
        <div className="container--fluid flex flex-col items-center">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contents.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map((approchItem) => (
              <li key={approchItem.label}>
                <CPVCard content={approchItem} />
              </li>
            ))}
          </ul>
          {contents.length > PAGE_SIZE && (
            <GenericPagination
              className="mt-8"
              numberOfPages={Math.ceil(contents.length / PAGE_SIZE)}
              pageNumber={page}
              setPageNumber={setPage}
              title="Pagination liste de APPROCH"
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
  content: PublicBuyerCard['approch_content'][number];
}

const CPVCard: React.FC<CPVCardProps> = ({ content }) => {
  const {
    description,
    marketEstimatedAmount,
    dlro,
    purchasingCategory,
    procedureType,
    consultationLink,
    url,
    status
  } = content;
  const dlroDate = dlro && new Date(dlro);
  const dlroStr =
    dlroDate &&
    ('0' + dlroDate?.getUTCDate()).slice(-2) +
      '/' +
      ('0' + ((dlroDate?.getUTCMonth() || 0) + 1)).slice(-2) +
      '/' +
      dlroDate?.getUTCFullYear();

  return (
    <div className="fr-card h-full w-full bg-input-background">
      <div className="fr-card__body ">
        <div className="fr-card__content">
          {/* <h3 className="fr-card__title"></h3> Commented because it creates an empty heading error */}
          <div className="fr-card__desc flex flex-col flex-1 ">
            <p className="font-bold">{description}</p>
            <div className="mt-auto">
              <div className="flex justify-between my-4">
                <p>
                  <span className="font-bold">Date limite dépot dossier: </span>
                  <br />
                  {dlroStr}
                </p>
                <p>
                  <span className="font-bold">Procedure: </span>
                  <br />
                  {procedureType.$ref}
                </p>
              </div>
              <div className="flex justify-between my-4">
                <p>
                  <span className="font-bold">Montant estimé du marché: </span>
                  <br />
                  {marketEstimatedAmount} €
                </p>
                <p>
                  <span className="font-bold">Status: </span>
                  <br />
                  {status}
                </p>
              </div>
              {consultationLink && (
                <div className="flex justify-between my-4">
                  <p>
                    <a href={url} target="_blank" rel="noreferrer noopener">
                      Sur APPROCH
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="fr-card__start">
            <ul className="fr-tags-group" aria-hidden={true}>
              <li>
                <p
                  className={`fr-badge fr-badge--sm bg-red-marianne-625-lightBackground text-red-marianne-625`}
                >
                  Cat. Achat: {purchasingCategory}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
