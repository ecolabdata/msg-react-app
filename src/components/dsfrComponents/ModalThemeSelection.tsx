import { SetStateAction } from "react";
import { Dispatch } from "react";

const ModalThemeSelection: React.FC<{ openedModale: boolean, setOpenedModale: Dispatch<SetStateAction<boolean>> }> = ({ openedModale, setOpenedModale }) => {
  return (
    <>
      <dialog
        id="fr-theme-modal"
        className="fr-modal"
        role="dialog"
        aria-labelledby="fr-theme-modal-title"
      >
        <div className="container container--fluid container-md">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-6 fr-col-lg-4">
              <div className="fr-modal__body">
                <div className="fr-modal__header">
                  <button className="fr-link--close fr-link" aria-controls="fr-theme-modal" onClick={() => setOpenedModale(!openedModale)} >
                    Fermer
                  </button>
                </div>
                <div className="fr-modal__content">
                  <h1 id="fr-theme-modal-title" className="fr-modal__title">
                    Paramètres d’affichage
                  </h1>
                  <div id="fr-display" className="fr-htmlForm-group fr-display">
                    <div className="fr-htmlForm-group">
                      <fieldset className="fr-fieldset">
                        <legend className="fr-fieldset__legend fr-text--regular" id="-legend">
                          Choisissez un thème pour personnaliser l’apparence du site.
                        </legend>
                        <div className="fr-fieldset__content">
                          <div className="fr-radio-group fr-radio-rich">
                            <input
                              value="light"
                              type="radio"
                              id="fr-radios-theme-light"
                              name="fr-radios-theme"
                            />
                            <label className="fr-label" htmlFor="fr-radios-theme-light">
                              Thème clair
                            </label>
                            <div className="fr-radio-rich__img" data-fr-inject-svg>
                              <img src="./dist/artwork/light.svg" alt="" />
                              {/* <!-- L’alternative de l’image (attribut alt) doit rester vide car l’image est illustrative et ne doit pas être restituée aux technologies d’assistance --> */}
                            </div>
                          </div>
                          <div className="fr-radio-group fr-radio-rich">
                            <input
                              value="dark"
                              type="radio"
                              id="fr-radios-theme-dark"
                              name="fr-radios-theme"
                            />
                            <label className="fr-label" htmlFor="fr-radios-theme-dark">
                              Thème sombre
                            </label>
                            <div className="fr-radio-rich__img" data-fr-inject-svg>
                              <img src="./dist/artwork/dark.svg" alt="" />
                              {/* <!-- L’alternative de l’image (attribut alt) doit rester vide car l’image est illustrative et ne doit pas être restituée aux technologies d’assistance --> */}
                            </div>
                          </div>
                          <div className="fr-radio-group fr-radio-rich">
                            <input
                              value="system"
                              type="radio"
                              id="fr-radios-theme-system"
                              name="fr-radios-theme"
                            />
                            <label className="fr-label" htmlFor="fr-radios-theme-system">
                              Système
                              <span className="fr-hint-text">Utilise les paramètres système.</span>
                            </label>
                            <div className="fr-radio-rich__img" data-fr-inject-svg>
                              <img src="./dist/artwork/system.svg" alt="" />
                              {/* <!-- L’alternative de l’image (attribut alt) doit rester vide car l’image est illustrative et ne doit pas être restituée aux technologies d’assistance --> */}
                            </div>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalThemeSelection;
