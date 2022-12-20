import { Api, HitPublicBuyer } from 'api2/Api';
import { useAdvancedFilters } from 'components/customComponents/filter/filters';
import ResultCard from 'components/customComponents/ResultCard';
import { acheteurPublic, CardType } from 'model/CardType';
import slugify from 'slugify';
import { buildSearchPageV2 } from '../SearchPageV2';

const SearchPageV2 = buildSearchPageV2(Api.searchActeurPublic);

export const ActeurPublicSearchPage: React.FC<{ cardType: CardType }> = ({ cardType }) => {
  return (
    <SearchPageV2 usedAdvancedFilter={useAdvancedFilters(cardType.name)} cardType={cardType}>
      {(hit, i, isLoading) => (
        <ActeurPublicResultCard key={i} isLoading={isLoading} ap={hit} cardType={cardType} />
      )}
    </SearchPageV2>
  );
};

interface ActeurPublicResultCardProps {
  isLoading?: boolean;
  ap: HitPublicBuyer;
  cardType: CardType;
}

export const ActeurPublicResultCard: React.FC<ActeurPublicResultCardProps> = ({
  isLoading,
  ap,
  cardType
}) => {
  const slug = slugify(ap.fields.public_actor_nom[0]);
  const public_actor_id = ap.fields.public_actor_id[0];
  const public_actor_id_siren = ap.fields.public_actor_id_siren[0];
  const startups = ap.fields['labelled_startups.nom'];
  const decpFirst = Object.keys(ap.highlight).filter((key) => key.startsWith('decp.'));
  const approchFirst = Object.keys(ap.highlight).filter((key) =>
    key.startsWith('approch_content.')
  );

  const public_actor_nom = ap.fields.public_actor_nom[0];
  const hlPublic_actor_nom = ap.highlight.public_actor_nom ? (
    <p
      dangerouslySetInnerHTML={{
        __html: replaceHlTxt(ap.highlight.public_actor_nom[0], cardType.color)
      }}
    ></p>
  ) : undefined;

  return (
    <ResultCard
      cardType={acheteurPublic}
      name={public_actor_nom}
      nameElem={hlPublic_actor_nom}
      toprow={'Ville / Région'}
      linkData={{}}
      slug={slug}
      isLoading={isLoading}
    >
      {/* <div>{ap._score}</div>
        <div>{public_actor_id}</div>
        <div>{public_actor_id_siren}</div> */}
      {startups && <div>Ils ont travaillé avec {startups?.join(',')}</div>}
      {decpFirst.length ? (
        <>
          <b style={{ color: cardType.color }}>{decpFirst.length}</b> Marchés passés
        </>
      ) : null}
      {decpFirst.length && approchFirst.length ? ' et ' : null}
      {approchFirst.length ? (
        <>
          <b style={{ color: cardType.color }}>{approchFirst.length}</b> Achats programmés
        </>
      ) : null}
      {decpFirst.length || approchFirst.length ? (
        <div>contiennent des mots de votre recherche</div>
      ) : null}
    </ResultCard>
  );
};

const openingTag = '@msg-highlighted-field@';
const closingTag = '@/msg-highlighted-field@';

function replaceHlTxt(txt: string, cssColor: string) {
  console.log({ txt });
  return txt
    .replaceAll(openingTag, `<b style="color: ${cssColor}">`)
    .replaceAll(closingTag, '</b>');
}
