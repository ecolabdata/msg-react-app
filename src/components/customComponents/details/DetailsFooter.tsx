import Container from 'components/Core/Container';
import getSources from 'contents/genericSources';
import CopieLink from '../../Core/CopieLink';
import { CardType } from 'model/CardType';

interface DetailsFooterProps {
  cardType: CardType;
}

const DetailsFooter: React.FC<DetailsFooterProps> = ({ cardType }) => {
  const sources = getSources(cardType.name);

  return (
    <Container>
      {sources && (
        <p>
          Sources de la donnée :{' '}
          <span>
            {sources.map(({ url, label }) => (
              <a key={label} className="mr-2" href={url}>
                {label}
              </a>
            ))}
          </span>
        </p>
      )}
      <div className="text-xl mb-5 font-bold mt-10">
        <h2 className="mb-3">Partager la page</h2>
        <CopieLink />
      </div>
    </Container>
  );
};

export default DetailsFooter;
