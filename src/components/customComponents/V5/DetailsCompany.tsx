import Container from 'components/Core/Container';
import { InformationItem, InformationItemsWrapper } from '../details/InformationItem';
import ContactAreaV5 from './ContactAreaV5';
import CardImagesV5 from './CardImages';
import LabelSectionV5 from './LabelSectionV5';
import { CompanyCard } from 'api5/interfaces/company';

interface DetailsCompanyProps {
  data: CompanyCard;
}

const DetailsCompany: React.FC<DetailsCompanyProps> = ({ data }) => {
  const {
    pitch,
    publicClients,
    websiteUrl,
    privateClients,
    helpersAndSupports,
    markets,
    oddStakes,
    description,
    labels,
    images,
    region,
    departement,
    ville
  } = data;
  return (
    <Container customClasses="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <Container customClasses="sm:col-span-2">
        {pitch && <InformationItem showDivider={false} label={'Pitch'} contents={pitch} />}
        <InformationItem
          showDivider={false}
          label={'Description de la solution'}
          contents={description}
          className="mt-8"
        />
        <InformationItemsWrapper>
          <>
            {publicClients && publicClients.length > 0 ? (
              <InformationItem label={'Clients publics'} contents={publicClients} />
            ) : null}
            {helpersAndSupports && (
              <InformationItem label={'Soutiens et supports'} contents={helpersAndSupports} />
            )}
            {region && <InformationItem showDivider={false} label={'Région'} contents={region} />}
          </>
          <>
            {markets && <InformationItem label={'Marchés'} contents={markets} />}
            {oddStakes && <InformationItem label={'Enjeux ODD'} contents={oddStakes} />}
          </>
        </InformationItemsWrapper>
        <InformationItemsWrapper>
          <>
            {departement && <InformationItem label={'Département'} contents={departement} />}
          </>
          <>
            {ville && <InformationItem label={'Ville'} contents={ville} />}
          </>
        </InformationItemsWrapper>
        <InformationItemsWrapper>
          <>
            {publicClients && publicClients.length > 0 && (
              <InformationItem label={'Clients publics'} contents={publicClients} isHtml />
            )}
          </>
          <>
            {privateClients && privateClients.length > 0 && (
              <InformationItem label={'Clients privés'} contents={privateClients} isHtml />
            )}
          </>
        </InformationItemsWrapper>
        <InformationItemsWrapper>
          <>
            {websiteUrl && (
              <InformationItem
                label={'Site web'}
                contents={`<a href=${websiteUrl}>${websiteUrl}</a>`}
                isHtml
              />
            )}
          </>
          <></>
        </InformationItemsWrapper>
        {labels && labels.length > 0 && <LabelSectionV5 labels={labels} />}
      </Container>
      <div>
        <ContactAreaV5 data={data} />
        {images && images.length > 0 && <CardImagesV5 images={images} />}
      </div>
    </Container>
  );
};

export default DetailsCompany;
