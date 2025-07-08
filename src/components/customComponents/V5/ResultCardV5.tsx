import ScreenReaderOnlyText from 'components/Core/ScreenReaderOnlyText';
import { PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CardType } from '../../../model/CardType';
import { Label } from 'api5/interfaces/common';

interface CardProps {
  name?: string | null;
  id: string | null;
  companyTopRow?: Label[];
  publicPurchaseTopRow?: string | null;
  cardType: CardType;
  isLoading?: boolean;
  content: string | null;
  logo?: string | null;
}

const ResultCardV5: React.FC<PropsWithChildren<CardProps>> = ({
  cardType,
  name,
  companyTopRow,
  publicPurchaseTopRow,
  id,
  isLoading,
  content,
  logo
}) => {
  const location = useLocation();
  if (!name) return <></>;
  return (
    <li className="h-full" style={{ opacity: isLoading ? 0.15 : 'inherit' }}>
      <div className="fr-card fr-enlarge-link w-full h-full">
        <div className="fr-card__body ">
          <div className="fr-card__content !pt-4 !px-6 !pb-16 ">
            <div className="fr-card__start">
              <ul className="fr-tags-group" aria-hidden={true}>
                <li>
                  {(companyTopRow || publicPurchaseTopRow) && (
                    <p
                      className={`fr-badge fr-badge--sm `}
                      style={{
                        color:
                          localStorage.getItem('scheme') === 'dark'
                            ? cardType?.color
                            : cardType.backgroundColor,
                        backgroundColor:
                          localStorage.getItem('scheme') === 'dark'
                            ? cardType?.backgroundColor
                            : cardType.color
                      }}>
                      {companyTopRow && companyTopRow.map((el) => el?.label).join(' | ')}
                      {publicPurchaseTopRow && publicPurchaseTopRow}
                    </p>
                  )}
                </li>
              </ul>
            </div>
            <div className="fr-card__title">
              <h3>
                {id && (
                  <Link to={`${location.pathname}/${id}`} className="rm-link-underline">
                    {name && (
                      <p className="mt-2 font-bold text-lg" title={name}>
                        {companyTopRow && companyTopRow.length && (
                          <ScreenReaderOnlyText
                            content={companyTopRow.map((el) => el?.label).join('')}
                          />
                        )}
                        {name}
                      </p>
                    )}
                  </Link>
                )}
              </h3>
              {logo && <img className="max-h-8" src={logo} />}
            </div>
            <div className="fr-card__desc">{content}</div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ResultCardV5;
