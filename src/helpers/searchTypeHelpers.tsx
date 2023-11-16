import { PublicBuyerHit } from 'apiv4/interfaces/publicBuyer';
import {
  SearchResultItem,
  isAidV4,
  isCompanyV4,
  isInvestorV4,
  isPublicBuyerHit,
  isPublicPurchaseV4
} from 'apiv4/interfaces/typeguards';
import { investisseur, startups, achatPrevi, CardType, acheteurPublic } from 'model/CardType';

export const getThumbnailInformation = (
  item: SearchResultItem | PublicBuyerHit,
  cardType: CardType
) => {
  if (isPublicBuyerHit(item)) {
    return {
      cardType: acheteurPublic,
      name: (item.fields?.public_actor_nom && item.fields.public_actor_nom[0]) ?? 'N/A',
      toprow: 'Ville / Région',
      id: item._id,
      slug: `details/${item._id}`,
      node: null
    };
  }

  const slug = `details/${item.id}`;
  if (isInvestorV4(item)) {
    return {
      cardType: investisseur,
      name: item.card.name,
      toprow:
        item.card.data_source.transformed_pexe_api &&
        item.card.data_source.transformed_pexe_api['Vous êtes'],
      id: item.id,
      slug,
      node: (
        <>
          <p>
            {item.card.ticket_min_k_euro}K€ - {item.card.ticket_max_k_euro}K€
          </p>
          {item.card.investment_policy && (
            <p className="h-[3em] truncate" title={item.card.investment_policy}>
              {item.card.investment_policy.split(';').join(' | ')}
            </p>
          )}
        </>
      )
    };
  }

  if (isCompanyV4(item)) {
    return {
      cardType: startups,
      name: item.card.name,
      toprow: item.card.themes && item.card.themes[0] ? item.card.themes[0] : 'Start-up',
      id: item.id,
      slug,
      node: <p>{item.card.short_description}</p>
    };
  }

  if (isPublicPurchaseV4(item)) {
    return {
      cardType: achatPrevi,
      name: item.card.name,
      toprow: item.card.data_source['approch']?.purchasingEntity?.label,
      id: item.id,
      slug,
      node: item.card.description && (
        <p className="h-[3em] truncate" title={item.card.description}>
          {item.card.description}
        </p>
      )
    };
  }

  if (isAidV4(item)) {
    return {
      cardType,
      name: item.card.name,
      toprow: item.card.supports && item.card.supports[0],
      id: item.id,
      slug,
      node: (
        <>
          <p>{item.card.nature}</p>
          <p>{item.card.recurrence}</p>
        </>
      )
    };
  }

  return {
    cardType: investisseur,
    name: 'N/A',
    toprow: 'N/A',
    slug: null,
    id: 'N/A',
    node: <></>
  };
};
