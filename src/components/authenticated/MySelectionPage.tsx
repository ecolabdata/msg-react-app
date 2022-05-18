import { useContext, useState } from 'react';
import { AnyCard } from '../../api/Api';
import { byName, dropdownValues } from '../../model/CardType';
import { ApplicationContext } from '../../Router';
import ResultPreviewCard from '../customComponents/ResultPreviewCard';
import DropDown from '../dsfrComponents/DropDown';
import ArrowDark from './../../assets/icons/arrow-dark-action.svg';

const MySelection = () => {
    const {usedFavoris} = useContext(ApplicationContext)
    const [idc1, idc2, favoris] = usedFavoris
    const [selectedCardTypeName, setSelectedCardTypeName] = useState("all")
    const handleOnSubmit = () => {
        console.log("Formulaire de recherche envoyé ");
    };

    const download = (cards : AnyCard[]) => {
            const propNames = Array.from(new Set(cards.flatMap(x => Object.keys(x))))
            var processRow = function (row : string[]) {
                var finalVal = '';
                
                for (var j = 0; j < row.length; j++) {
                    var innerValue = row[j] === null ? '' : row[j].toString();
                    var result = innerValue.replace(/"/g, '""');
                    if (result.search(/("|,|\n)/g) >= 0)
                        result = '"' + result + '"';
                    if (j > 0)
                        finalVal += ', ';
                    finalVal += result;
                }
                return finalVal + '\n';
            };
            
            function cardsToRow(card : AnyCard) {
                return propNames.map(key => (card as any)[key]?.toString() || "")
            }

            const rows = [
                propNames,
                ...cards.map(cardsToRow)
            ];
            var csvFile = '';
            for (var i = 0; i < rows.length; i++) {
                csvFile += processRow(rows[i]);
            }
    
            var blob = new Blob(["\uFEFF", csvFile], {type:"text/plain;charset=UTF-16LE"});
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", "favoris.csv");
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
    }

    return (
        <>
            <div className="headContainer mx-auto w-3/4 ">

                <button onClick={() => window.history.back()} className="ml-4 text-dark-text-action flex mt-4 rm-link-underline "> <img className="mr-2" src={ArrowDark} alt="Icone flèche" /> Retour </button>

                <div className="cardTitle  my-10 ml-4 text-base flex justify-between items-center">

                    <h2 className="w-fit font-bold text-xl
                    lg:text-4xl">
                        <div className="flex items-center">
                            Ma sélection <span className="mt-1 mx-2 text-sm
                            font-extralight
                            lg:text-xl">{`(${Object.keys(favoris).length})`}</span>
                        </div>
                    </h2>

                    <div className="actionButtonsContainer w-1/2 ml-15 flex justify-end items-center">

                        <button className="fr-btn fr-btn--sm fr-btn--primary fr-fi-download-line fr-btn--icon-left mr-2 h-[40px]
                        md:h-[40%]
                        "
                        onClick={() => download(Object.values(favoris))}>
                            Télécharger (WIP)
                        </button>

                        {/* <button className="fr-btn fr-btn--sm fr-btn--primary fr-fi-mail-fill fr-btn--icon-left
                        sm:h-[45%] sm:text-xs
                        lg:ml-2">
                            Envoyer par email
                        </button> */}
                    </div>

                </div>

                <div className="researchContainer my-10 ml-4 p-6 flex flex-col  bg-research-precision-container">

                    <p className=" bold text-xl text-center text-blue-france-main">Filtrer </p>

                    <form onSubmit={() => handleOnSubmit()} className="inputsContainer flex">
                        <DropDown borderColor="blue-france-main" title='Type de piste' usedState={[selectedCardTypeName, setSelectedCardTypeName]} values={{"all": "Toutes", ...dropdownValues}}/>  
                    </form>

                </div>

            </div>

            <div className="cardsContainer mx-auto w-3/4 justify-center flex flex-wrap">
                    {Object.values(favoris).filter(x => selectedCardTypeName === "all" || selectedCardTypeName === x.cardTypeName).map((card) => <ResultPreviewCard cardType={byName[card.cardTypeName]} cardData={card}/>)}
            </div>

            {/* <Pagination currentPageNo={pageNo} baseUrl={cardType.searchLink + "/" + searchId} nbPage={nbPage}/> */}
        </>
    )
}

export default MySelection