import React, { useContext, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ApplicationContext } from '../../App';
import { ArrowRight } from '../../assets/Icons';
import { CardType } from '../../model/CardType';
import { InitialState } from '../../utils/InitialState';

export interface CardsPreviewProps {
  cardType: CardType;
  initialState: InitialState;
  resultCount: number;
  children: React.ReactNode;
}

const ResultCardsPreview: React.FC<CardsPreviewProps> = ({
  cardType,
  initialState,
  children,
  resultCount
}) => {
  const { usedNextScrollTarget } = useContext(ApplicationContext);
  const [nextScrollTarget, setNextScrollTarget] = usedNextScrollTarget;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="globalContainerCard flex flex-col justify-center mb-8 mx-4 lg:mx-12">
      <div className="cardGeneralInformations flex flex-wrap mb-4">
        <div className="cardTitle p-2 flex-auto">
          <div className="flex items-center">
            <cardType.SVGLogo style={{ color: cardType.color }} aria-hidden={true} /> &nbsp;
            <h2 className="w-fit font-bold md:text-2xl">
              {cardType.title} <span className="bg-yellow md:text-lg">{`(${resultCount})`}</span>
            </h2>
          </div>

          <p className="mt-2 text-base">{cardType.description}</p>
        </div>

        <div className="seeAllbutton p-2">
          <NavLink
            onClick={() => setNextScrollTarget({ top: 0 })}
            to={cardType.searchLink}
            state={initialState}
            aria-label={`Voir tout et filtrer: ${cardType.title}`}
            className="w-fit h-9 text-base  text-dark-text-action p-1 rm-link-underline flex justify-center">
            <span className="my-auto">Voir tout & filtrer</span> &nbsp;
            <ArrowRight className="my-auto" width="16" height="16" />{' '}
          </NavLink>
        </div>
      </div>

      <div className="fr-container--fluid" ref={ref}>
        <ul className="fr-grid-row fr-grid-row--gutters">{children}</ul>
      </div>
    </div>
  );
};

export default ResultCardsPreview;
