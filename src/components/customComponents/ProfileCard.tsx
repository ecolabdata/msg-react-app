import { Link } from 'react-router-dom';

export interface ProfileCardProps {
  title: string;
  description: string;
  badge: string;
  type: 'startup' | 'publicActor';
}

const ProfileCard: React.FC<ProfileCardProps> = ({ title, description, badge, type }) => {
  return (
    <li className="fr-card fr-enlarge-link w-full max-w-[300px] m-2 self-center md:!self-stretch">
      <div className="fr-card__body ">
        <div className="fr-card__content !pt-4 !px-6 !pb-16 ">
          <h3 className="fr-card__title">
            <Link
              to={type === 'startup' ? '/entreprises' : '/acteurs-publics'}
              className="rm-link-underline"
            >
              <span className="clamp mt-2 font-bold text-xl">{title}</span>
            </Link>
          </h3>
          <p className="fr-card__desc text-sm">{description}</p>
          <div className="fr-card__start">
            <ul className="fr-tags-group" aria-hidden={true}>
              <li>
                <p className={`fr-badge fr-badge--sm `}>{badge} </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProfileCard;
