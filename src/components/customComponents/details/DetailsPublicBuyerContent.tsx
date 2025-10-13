import { InformationCard } from '../InformationCard';
import { Tabs } from '../Tabs';
import { TagsList } from '../../Core/TagsList';
import { PublicBuyerBuyTab } from './PublicBuyerBuyTab';
import { PublicBuyerMarketTab } from './PublicBuyerMarketTab';
import { PublicBuyerCard } from 'api/interfaces/publicBuyer';

interface DetailsPublicBuyerContentProps {
  card: PublicBuyerCard;
}

const DetailsPublicBuyer: React.FC<DetailsPublicBuyerContentProps> = ({ card }) => {
  const tabs = [
    {
      id: 'market-tab',
      Button: 'Marchés passés',
      Panel: <PublicBuyerMarketTab contents={card.marketContents} />
    },
    {
      id: 'buy-tab',
      Button: 'Achats programmés',
      Panel: <PublicBuyerBuyTab contents={card.buyContents} />
    }
  ];

  return (
    <div>
      {card.labelled_startups && (
        <>
          <h2 className="text-4xl mb-2">Cette collectivité à travaillé avec ... </h2>
          <div className="flex flex-col mt-8 mb-16">
            <p className="mb-4">
              La liste suivante non exhaustive est basée sur les données des marchés présents dans
              les
              <span>
                {' '}
                <a
                  href="https://www.economie.gouv.fr/daj/oecp-recensement-economique-commande-publique"
                  target="_blank"
                  rel="noreferrer">
                  DECP
                </a>
              </span>
            </p>
            <TagsList
              tags={card.labelled_startups}
              tagClassName="bg-red-marianne-625-lightBackground text-red-marianne-625"
            />
          </div>
        </>
      )}
      <div className=" w-full flex flex-col items-center my-16 ">
        <h3 className="text-4xl mb-8">Quelques chiffres</h3>
        <div className="flex flex-wrap w-full justify-center">
          <InformationCard title={card.marketContents?.length || 0} subtitle="Marchés passés" />
          <InformationCard title={card.buyContents?.length || 0} subtitle="Achats programmés" />
          {card.averageMarketDealAmount && (
            <InformationCard
              title={card.averageMarketDealAmount}
              subtitle="Montant moyen en euros"
            />
          )}
        </div>
      </div>
      <div className=" w-full flex flex-col items-center my-16">
        <h3 className="text-4xl  mb-16">Détails des marchés passés et à venir</h3>

        <Tabs tabs={tabs} label="détail acheteur public" className="2xl w-full" />
      </div>
    </div>
  );
};

export default DetailsPublicBuyer;
