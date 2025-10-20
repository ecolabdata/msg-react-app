import { InformationItem, InformationItemsWrapper } from './details/InformationItem';
import Container from 'components/Core/Container';
import { AidCard } from 'api/interfaces/aid';

interface DetailsAidProps {
    card: AidCard;
}

export const DetailsAid: React.FC<DetailsAidProps> = ({ card }) => {
    const {
        description,
        contact,
        websiteUrl,
        startDate,
        predepositDate,
        submissionDeadline,
        recurrence,
        targetedAudiences,
        destinations,
        aidTypes,
        programs,
        europeanAid,
        financers,
        instructors,
        perimeter,
        perimeterScale,
        projectExamples,
        projectReferences,
        eligibility,
        loanAmount,
        mobilizationSteps,
        subventionComment
    } = card;

    return (
        <Container customClasses="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="sm:col-span-3">
                <InformationItemsWrapper>
                    {contact && <InformationItem label={'Contacts'} contents={contact} isHtml />}
                    {websiteUrl && (
                        <InformationItem
                            label={'Site web'}
                            contents={websiteUrl}
                        />
                    )}
                </InformationItemsWrapper>
                <InformationItemsWrapper>
                    <InformationItem label={'Description du projet'} contents={description} isHtml />
                    {eligibility && (
                        <InformationItem label={'Eligibilité'} contents={eligibility} isHtml />
                    )}
                </InformationItemsWrapper>
                <InformationItemsWrapper>
                    <>
                        {startDate && (
                            <InformationItem
                                label={'Date de début'}
                                contents={startDate}
                            />
                        )}
                    </>
                    <>{predepositDate && <InformationItem label={"Date de pré-dépôt"} contents={predepositDate} />}</>
                </InformationItemsWrapper>
                <InformationItemsWrapper>
                    <>{submissionDeadline && <InformationItem label={"Date de dépôt"} contents={submissionDeadline} />}</>
                    {loanAmount && (
                        <InformationItem label={'Montant du prêt'} contents={loanAmount} />
                    )}
                </InformationItemsWrapper>
                <InformationItemsWrapper>
                    {recurrence && (
                        <InformationItem
                            label={'Récurrence'}
                            contents={recurrence}
                        />
                    )}
                    {targetedAudiences && (
                        <InformationItem label={'Public cible'} contents={targetedAudiences} />
                    )}
                </InformationItemsWrapper>
                <InformationItemsWrapper>
                    {destinations && destinations?.length > 0 && (
                        <InformationItem label={'Destinations'} contents={destinations} />
                    )}
                    {aidTypes && aidTypes?.length > 0 && (
                        <InformationItem label={'Types d\'aide'} contents={aidTypes} />
                    )}
                </InformationItemsWrapper>
                <InformationItemsWrapper>
                    {programs && programs?.length > 0 && (
                        <InformationItem label={'Programmes'} contents={programs} />
                    )}
                    {europeanAid && (
                        <InformationItem label={'Aide européenne'} contents={europeanAid} />
                    )}
                    {financers && financers?.length > 0 && (
                        <InformationItem label={'Financiers'} contents={financers} />
                    )}
                </InformationItemsWrapper>
                {instructors && instructors?.length > 0 && (
                    <InformationItem label={'Instructeurs'} contents={instructors} />
                )}
                <InformationItemsWrapper>
                    {perimeter && (
                        <InformationItem label={'Périmètre'} contents={perimeter} />
                    )}
                    {perimeterScale && (
                        <InformationItem label={'Échelle du périmètre'} contents={perimeterScale} />
                    )}
                </InformationItemsWrapper>
                <InformationItemsWrapper>
                    {projectExamples && (
                        <InformationItem label={'Exemples de projets'} contents={projectExamples} isHtml />
                    )}
                    {projectReferences && (
                        <InformationItem label={'Références de projets'} contents={projectReferences} />
                    )}
                </InformationItemsWrapper>
                <InformationItemsWrapper>
                    {mobilizationSteps && (
                        <InformationItem label={'Étapes de mobilisation'} contents={mobilizationSteps} />
                    )}
                    {subventionComment && (
                        <InformationItem label={'Commentaire sur la subvention'} contents={subventionComment} />
                    )}
                </InformationItemsWrapper>
            </div>
        </Container>
    );
};
