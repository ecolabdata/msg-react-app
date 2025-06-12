import { useState } from 'react';
import ExternalLink from '../../Core/ExternalLink';
import {
  SearchResultItem,
  isAidV4,
  isCompanyV4,
  isInvestorV4,
  isPublicPurchaseV4
} from 'apiv4/interfaces/typeguards';

interface ContactAreaProps {
  data: SearchResultItem;
  className?: string;
}

const someNotNull = (x: Record<string, any>) => Object.values(x).find((x) => x != null);

// V5 remove this
const ContactArea: React.FC<ContactAreaProps> = ({ data, className }) => {
  const { title, content, cta, link, secondaryCta } = normalizeContactInformations(data);
  const [showContact, setShowContact] = useState(false);

  return (
    <div className={`flex flex-col ${className}`}>
      <h2 className="text-2xl mb-4">{title}</h2>
      <p>{content}</p>
      {cta?.contact && someNotNull(cta?.contact) ? (
        <>
          {!showContact && (
            <button
              onClick={() => setShowContact(true)}
              className="fr-btn fr-btn--primary w-fit px-4 h-3 py-2 hover:bg-claire-bf__hover mt-6  ">
              {cta?.label}
            </button>
          )}
          {showContact && (
            <div className="flex flex-col px-8 my-4">
              {Object.entries(cta.contact).map(([k, v]) => (
                <p key={k}>{v}</p>
              ))}
            </div>
          )}
        </>
      ) : (
        cta &&
        cta.url && (
          <ExternalLink
            href={cta.url}
            content={cta.label}
            className="fr-btn fr-btn--primary w-fit  px-4  py-2 hover:bg-claire-bf__hover mt-6"
          />
        )
      )}
      {link && (
        <ExternalLink
          href={link}
          content="Voir le site internet"
          className="fr-link rm-link-underline mt-2"
        />
      )}
      {secondaryCta && secondaryCta.url && (
        <ExternalLink
          href={secondaryCta.url}
          content={secondaryCta.label}
          className="fr-btn fr-btn--secondary w-fit px-4 h-fit py-2 hover:bg-claire-bf__hover mt-6"
        />
      )}
    </div>
  );
};

export default ContactArea;

const normalizeContactInformations = (data: SearchResultItem) => {
  if (isInvestorV4(data)) {
    const contactData = data.card.data_source?.transformed_pexe_api;
    return {
      title: 'Contact et détails',
      content: `${contactData?.Prenom} ${contactData?.Nom}`,
      cta: {
        label: 'Voir la fiche et le contact',
        icon: 'mail',
        contact: {
          phone: contactData?.TELEPHONE_FIXE,
          mail: contactData?.Email
        }
      },
      secondaryCta: {
        label: 'Voir le porfolio complet',
        url: contactData?.Site_Web
      }
    };
  }

  if (isAidV4(data)) {
    return {
      title: 'Contact',
      content: 'Relais locaux',
      cta: {
        label: "Lien vers l'aide originale",
        url: data.card.data_source.aide_territoire?.origin_url
      },
      secondaryCta: {
        label: 'Lien vers la démarche en ligne',
        url: data.card.data_source.aide_territoire?.application_url
      }
    };
  }

  if (isPublicPurchaseV4(data)) {
    //A METTRE A JOUR AVEC LA NOUVELLE FONCTION ISPUBLICBUYER
    return {
      title: 'Contact',
      content:
        'Certains contacts de services publics sont présents sur lannuaire.service-public.fr',
      cta: {
        label: "Accèder à l'annuaire",
        url: data.card.source_url
      }
    };
  }
  if (isCompanyV4(data)) {
    const greenTechData = data.card.data_source?.greentech_innovation;

    return {
      title: 'Contact et détails',
      content: data.card.name,
      cta: {
        label: 'Voir le contact',
        icon: 'mail',
        contact: {
          mail: greenTechData?.Mail,
          linkedIn: greenTechData?.LinkedIn,
          phone: greenTechData && greenTechData['Téléphone']
        }
      },
      link: greenTechData && greenTechData['Site internet']
    };
  }

  if (isPublicPurchaseV4(data)) {
    return {
      title: 'Contact',
      content:
        'APProch, les projets d’achats publics accessibles maintenant. Créez votre compte sur APProch, pour indiquer votre intérêt et entrer en contact avec l’entité acheteuse en amont de la publication de l’appel d’offre !',
      cta: {
        label: 'Signifiez votre intérêt',
        url: 'https://projets-achats.marches-publics.gouv.fr/#'
      }
    };
  }
  return {
    title: null,
    content: null,
    cta: null
  };
};
