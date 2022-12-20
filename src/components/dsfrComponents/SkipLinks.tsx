const SkipLinks: React.FC = () => {
  return (
    <div className="fr-skiplinks">
      <nav className="container" role="navigation" aria-label="Accès rapide">
        <ul className="fr-skiplinks__list">
          <li>
            <a className="fr-link" href="#main-content">
              Contenu
            </a>
          </li>
          <li>
            <a className="fr-link" href="#footer">
              Pied de page
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SkipLinks;
