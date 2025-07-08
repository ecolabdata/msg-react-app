import Container from 'components/Core/Container';
import { UnknownCard } from 'api5/interfaces/common';
import { InformationItem, InformationItemsWrapper } from '../details/InformationItem';
import ContactAreaV5 from './ContactAreaV5';
import CardImagesV5 from './CardImages';
import LabelSectionV5 from './LabelSectionV5';

interface DetailsGenericContentProps {
  data: UnknownCard;
}

const DetailsBodyV5: React.FC<DetailsGenericContentProps> = ({ data }) => {
  const {
    pitch,
    publicClients,
    sourceUrl,
    websiteUrl,
    privateClients,
    headquarterAddress,
    helpersAndSupports,
    creationDate,
    zones,
    markets,
    oddStakes,
    description,
    labels,
    images
  } = data;
  return (
    <Container customClasses="grid grid-cols-1 sm:grid-cols-3 gap-8">
      <Container customClasses="sm:col-span-2">
        <InformationItemsWrapper>
          <>
            {pitch && <InformationItem showDivider={false} label={'Pitch'} contents={pitch} />}
            {publicClients && publicClients.length > 0 ? (
              <InformationItem label={'Clients publics'} contents={publicClients} />
            ) : null}
            {helpersAndSupports && (
              <InformationItem label={'Soutiens et supports'} contents={helpersAndSupports} />
            )}
          </>
          <>
            {zones && <InformationItem showDivider={false} label={'Région'} contents={zones} />}
            {markets && <InformationItem label={'Marchés'} contents={markets} />}
            {oddStakes && <InformationItem label={'Enjeux ODD'} contents={oddStakes} />}
          </>
        </InformationItemsWrapper>
        <InformationItem
          showDivider={false}
          label={"L'entreprise"}
          contents={description}
          className="mt-8"
        />
        <InformationItemsWrapper>
          {creationDate && <InformationItem label={'Date de création'} contents={creationDate} />}
          {headquarterAddress && (
            <InformationItem
              label={'Adresse du siège social de l’entreprise'}
              contents={headquarterAddress}
            />
          )}
        </InformationItemsWrapper>
        <InformationItemsWrapper>
          {publicClients && publicClients.length > 0 && (
            <InformationItem label={'Clients publics'} contents={publicClients} isHtml />
          )}
          {privateClients && privateClients.length > 0 && (
            <InformationItem label={'Clients privés'} contents={privateClients} isHtml />
          )}
        </InformationItemsWrapper>
        <InformationItemsWrapper>
          {websiteUrl && (
            <InformationItem
              label={'Site web'}
              contents={`<a href=${websiteUrl}>${websiteUrl}</a>`}
              isHtml
            />
          )}
          {sourceUrl && (
            <InformationItem
              label={'URL Source'}
              contents={`<a target="_blank" href=${sourceUrl}>${sourceUrl}</a>`}
              isHtml
            />
          )}
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

export default DetailsBodyV5;
