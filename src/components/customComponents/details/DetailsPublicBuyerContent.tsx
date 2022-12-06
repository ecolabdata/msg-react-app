import { Collectivite } from '../../../api/Api';
import { Tabs } from '../Tabs';
import { TagsList } from '../TagsList';
import PublicBuyerPanelContent, { Decp } from './PublicBuyerTabPanel';

interface DetailsPublicBuyerContentProps {
  card: Collectivite;
}

const DetailsPublicBuyer: React.FC<DetailsPublicBuyerContentProps> = ({ card }) => {
  const tags = card.labelled_startups.map((s) => s.nom).filter((name) => !!name);
  const tabs = [
    {
      id: 'market-tab',
      Button: 'Marchés passés',
      Panel: (
        <PublicBuyerPanelContent
          contents={card.decp.filter((d) => d._type === 'Marché') as unknown as Decp[]}
        />
      )
    },
    {
      id: 'buy-tab',
      Button: 'Achats programmés',
      Panel: (
        <PublicBuyerPanelContent
          contents={card.decp.filter((d) => d._type === 'Achats') as unknown as Decp[]}
        />
      )
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
      <Tabs tabs={tabs} label="détail acheteur public" className="2xl:max-w-4/5" />
    </div>
  );
};

export default DetailsPublicBuyer;
