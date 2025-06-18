import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';

const BreadCumb: React.FC = () => {
  const [slugs, setSlugs] = useState<string[]>([]);
  const location = useLocation();
  const isMobile = useCheckMobileScreen();
  useEffect(() => {
    setSlugs(location.pathname.split('/'));
  }, [location]);
  if (location.pathname === '/') return <></>;
  return (
    <nav
      role="navigation"
      className="fr-breadcrumb  h-full container mx-auto  !mb-0 mt-8 "
      aria-label="vous êtes ici :">
      {isMobile && slugs.length > 0 && (
        <button
          className="fr-breadcrumb__button"
          aria-expanded="false"
          aria-controls="breadcrumb-1">
          Voir le fil d’Ariane
        </button>
      )}
      <div className="fr-collapse" id="breadcrumb-1">
        <ol className="fr-breadcrumb__list truncate w-100">
          {slugs.length > 0 && (
            <li>
              <Link className="fr-breadcrumb__link" to="/">
                Accueil
              </Link>
            </li>
          )}

          {slugs.length > 1 &&
            slugs.map((slug, index) => {
              if (!slug) return null;
              if (index >= 3) {
                return (
                  <li key={slug + index}>
                    <span className="fr-breadcrumb__link" aria-current="page">
                      Fiche détail
                    </span>
                  </li>
                );
              }
              let fullSlug = '';
              if (slugs[index - 1]) {
                fullSlug += `${slugs[index - 1]}/`;
              }
              fullSlug += slug;
              return (
                <li key={fullSlug + index}>
                  <Link
                    className="fr-breadcrumb__link capitalize"
                    to={fullSlug}
                    aria-current={index === slugs.length - 1 ? 'page' : undefined}>
                    {' '}
                    {slug.replaceAll('-', ' ')}
                  </Link>
                </li>
              );
            })}
        </ol>
      </div>
    </nav>
  );
};

export default BreadCumb;
