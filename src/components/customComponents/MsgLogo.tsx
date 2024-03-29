import LogoMSG from '../../assets/msg-icon.svg';

const MsgLogo: React.FC = () => {
  return (
    <>
      <img className="h-12 mt-1 mr-2" src={LogoMSG} alt="" aria-hidden={true} />
      <div className="fr-header__service">
        <p className="fr-header__service-title capitalize" role="heading" aria-level={1}>
          mes services greentech
          <span className="fr-badge fr-badge--sm fr-badge--green-emeraude">BÊTA</span>
        </p>
        <p>Ressources dédiées à l'écosystème greentech</p>
      </div>
    </>
  );
};

export default MsgLogo;
