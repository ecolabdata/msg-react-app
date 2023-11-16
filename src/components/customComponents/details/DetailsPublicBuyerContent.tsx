import { InformationCard } from '../InformationCard';
import { Tabs } from '../Tabs';
import { TagsList } from '../../Core/TagsList';
import { PublicBuyerApprochTab } from './PublicBuyerApprochTab';
import { PublicBuyerDecpTab } from './PublicBuyerDecpTab';
import { PublicBuyerCard } from 'apiv4/interfaces/publicBuyer';

interface DetailsPublicBuyerContentProps {
  card: PublicBuyerCard;
}

const DetailsPublicBuyer: React.FC<DetailsPublicBuyerContentProps> = ({ card }) => {
  const tags = card.labelled_startups.map((s) => s.nom).filter((name) => !!name);

  const marketContents = card.decp;
  const buyContents = card.approch_content?.filter((x) => {
    return x.status != 'draft';
  });
  const tabs = [
    {
      id: 'market-tab',
      Button: 'Marchés passés',
      Panel: <PublicBuyerDecpTab contents={marketContents} />
    },
    {
      id: 'buy-tab',
      Button: 'Achats programmés',
      Panel: <PublicBuyerApprochTab contents={buyContents} />
    }
  ];

  return (
    <div>
      {tags?.length > 0 && (
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
                  rel="noreferrer"
                >
                  DECP
                </a>
              </span>
            </p>
            <TagsList
              tags={tags as string[]}
              tagClassName="bg-red-marianne-625-lightBackground text-red-marianne-625"
            />
          </div>
        </>
      )}
      <div className=" my-8 w-full flex flex-col items-center my-16 ">
        <h3 className="text-4xl mb-8">Quelques chiffres</h3>
        <div className="flex flex-wrap w-full justify-center">
          <InformationCard title={marketContents?.length || 0} subtitle="Marchés passés" />
          <InformationCard title={buyContents?.length || 0} subtitle="Achats programmés" />
          <InformationCard
            title={getAverageMarketDealAmount(marketContents)}
            subtitle="Montant moyen en euros"
          />
        </div>
      </div>
      <div className=" my-8 w-full flex flex-col items-center my-16">
        <h3 className="text-4xl  mb-16">Détails des marchés passés et à venir</h3>

        <Tabs tabs={tabs} label="détail acheteur public" className="2xl w-full" />
      </div>
    </div>
  );
};

export default DetailsPublicBuyer;

const getAverageMarketDealAmount = (markets: PublicBuyerCard['decp']) => {
  const { amount, numberOfMarkets } = markets.reduce(
    ({ amount, numberOfMarkets }, market) => {
      if (!isNaN(market?.montant)) {
        return { amount: amount + market?.montant, numberOfMarkets: ++numberOfMarkets };
      }
      return { amount, numberOfMarkets };
    },
    { amount: 0, numberOfMarkets: 0 }
  );
  return numberWithWhiteSpaceSeparator(numberOfMarkets ? Math.round(amount / numberOfMarkets) : 0);
};

function numberWithWhiteSpaceSeparator(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
