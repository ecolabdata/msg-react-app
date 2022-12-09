import { Collectivite } from '../../../api/Api';
import { InformationCard } from '../InformationCard';
import { Tabs } from '../Tabs';
import { TagsList } from '../TagsList';
import PublicBuyerPanelContent, { Decp } from './PublicBuyerTabPanel';

interface DetailsPublicBuyerContentProps {
  card: Collectivite;
}

const DetailsPublicBuyer: React.FC<DetailsPublicBuyerContentProps> = ({ card }) => {
  const tags = card.labelled_startups.map((s) => s.nom).filter((name) => !!name);

  const marketContents = card.decp.filter((d) => d._type === 'Marché');
  const buyContents = card.decp.filter((d) => d._type === 'Achats');

  const tabs = [
    {
      id: 'market-tab',
      Button: 'Marchés passés',
      Panel: <PublicBuyerPanelContent contents={marketContents as unknown as Decp[]} />
    },
    {
      id: 'buy-tab',
      Button: 'Achats programmés',
      Panel: <PublicBuyerPanelContent contents={buyContents as unknown as Decp[]} />
    }
  ];

  return (
    <div>
      <h2 className="text-2xl mb-2">Cette collectivité à travaillé avec ... </h2>
      <div className="flex flex-col mt-8 mb-16">
        <p className="mb-4">
          La liste suivante non exhaustive est basée sur les données des marchés présents dans les
          DECP
        </p>
        <TagsList tags={tags as string[]} />
      </div>
      <div className=" my-8 w-full">
        <h3>Quelques chiffres</h3>
        <div className="flex justify-evenlyflex-wrap">
          <InformationCard
            title={marketContents?.length || 0}
            subtitle="Marchés passés"
            description="description a rajouter"
          />
          <InformationCard
            title={buyContents?.length || 0}
            subtitle="Achats programmés"
            description="description a rajouter"
          />
          <InformationCard
            title={marketContents?.length || 0}
            subtitle="Montant moyen en euros"
            description="description a rajouter"
          />
        </div>
      </div>

      <Tabs tabs={tabs} label="détail acheteur public" className="2xl:max-w-4/5" />
    </div>
  );
};

export default DetailsPublicBuyer;
