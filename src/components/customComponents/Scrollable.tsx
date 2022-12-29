import { useNavigate } from 'react-router-dom';
import ArrowInvestors from './../../assets/icons/arrow-private-investors.svg';
import Star from './../../assets/icons/star-fill.svg';
import Trash from './../../assets/icons/trash-fill.svg';
interface CardsPreviewProps {
  emetor: string;
  cardTitle: string;
}

const Scrollable: React.FC<CardsPreviewProps> = ({ emetor, cardTitle }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="container rounded-r min-w-282 ml-3 mt-4 w-282 h-181 addBorder-l border-l-3 border-private-investors p-4 bg-research-card-preview
                     flex flex-col
                     hover:scale-y-115 hover:shadow-2xl
                     transform transition ease-out duration-200 
                     group
                    "
      >
        <div className="emetor-row flex">
          <p className="text-green-500 text-xs"> {emetor}</p>
          <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100">
            <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
            <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
          </div>
        </div>

        <h4 className="mt-10 w-4/5 fixed text-white font-bold text-xl ">{cardTitle}</h4>

        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100">
          {' '}
          vc | ba | corporate
        </p>

        <button onClick={() => navigate('/liste-resultats')} className="self-end">
          <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
        </button>
      </div>
      <div
        className="container rounded-r min-w-282 ml-3 mt-4 w-282 h-181 addBorder-l border-l-3 border-private-investors p-4 bg-research-card-preview
                     flex flex-col
                     hover:scale-y-115 hover:shadow-2xl
                     transform transition ease-out duration-200 
                     group
                    "
      >
        <div className="emetor-row flex">
          <p className="text-green-500 text-xs"> {emetor}</p>
          <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100">
            <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
            <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
          </div>
        </div>

        <h4 className="mt-10 w-4/5 fixed text-white font-bold text-xl ">{cardTitle}</h4>

        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100">
          {' '}
          vc | ba | corporate
        </p>

        <button onClick={() => navigate('/liste-resultats')} className="self-end">
          <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
        </button>
      </div>
      <div
        className="container rounded-r min-w-282 ml-3 mt-4 w-282 h-181 addBorder-l border-l-3 border-private-investors p-4 bg-research-card-preview
                     flex flex-col
                     hover:scale-y-115 hover:shadow-2xl
                     transform transition ease-out duration-200 
                     group
                    "
      >
        <div className="emetor-row flex">
          <p className="text-green-500 text-xs"> {emetor}</p>
          <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100">
            <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
            <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
          </div>
        </div>

        <h4 className="mt-10 w-4/5 fixed text-white font-bold text-xl ">{cardTitle}</h4>

        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100">
          {' '}
          vc | ba | corporate
        </p>

        <button onClick={() => navigate('/liste-resultats')} className="self-end">
          <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
        </button>
      </div>
      <div
        className="container rounded-r min-w-282 ml-3 mt-4 w-282 h-181 addBorder-l border-l-3 border-private-investors p-4 bg-research-card-preview
                     flex flex-col
                     hover:scale-y-115 hover:shadow-2xl
                     transform transition ease-out duration-200 
                     group
                    "
      >
        <div className="emetor-row flex">
          <p className="text-green-500 text-xs"> {emetor}</p>
          <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100">
            <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
            <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
          </div>
        </div>

        <h4 className="mt-10 w-4/5 fixed text-white font-bold text-xl ">{cardTitle}</h4>

        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100">
          {' '}
          vc | ba | corporate
        </p>

        <button onClick={() => navigate('/liste-resultats')} className="self-end">
          <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
        </button>
      </div>
      <div
        className="container rounded-r min-w-282 ml-3 mt-4 w-282 h-181 addBorder-l border-l-3 border-private-investors p-4 bg-research-card-preview
                     flex flex-col
                     hover:scale-y-115 hover:shadow-2xl
                     transform transition ease-out duration-200 
                     group
                    "
      >
        <div className="emetor-row flex">
          <p className="text-green-500 text-xs"> {emetor}</p>
          <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100">
            <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
            <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
          </div>
        </div>

        <h4 className="mt-10 w-4/5 fixed text-white font-bold text-xl ">{cardTitle}</h4>

        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100">
          {' '}
          vc | ba | corporate
        </p>

        <button onClick={() => navigate('/liste-resultats')} className="self-end">
          <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
        </button>
      </div>
      <div
        className="container rounded-r min-w-282 ml-3 mt-4 w-282 h-181 addBorder-l border-l-3 border-private-investors p-4 bg-research-card-preview
                     flex flex-col
                     hover:scale-y-115 hover:shadow-2xl
                     transform transition ease-out duration-200 
                     group
                    "
      >
        <div className="emetor-row flex">
          <p className="text-green-500 text-xs"> {emetor}</p>
          <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100">
            <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
            <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
          </div>
        </div>

        <h4 className="mt-10 w-4/5 fixed text-white font-bold text-xl ">{cardTitle}</h4>

        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100">
          {' '}
          vc | ba | corporate
        </p>

        <button onClick={() => navigate('/liste-resultats')} className="self-end">
          <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
        </button>
      </div>
      <div
        className="container rounded-r min-w-282 ml-3 mt-4 w-282 h-181 addBorder-l border-l-3 border-private-investors p-4 bg-research-card-preview
                     flex flex-col
                     hover:scale-y-115 hover:shadow-2xl
                     transform transition ease-out duration-200 
                     group
                    "
      >
        <div className="emetor-row flex">
          <p className="text-green-500 text-xs"> {emetor}</p>
          <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100">
            <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
            <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
          </div>
        </div>

        <h4 className="mt-10 w-4/5 fixed text-white font-bold text-xl ">{cardTitle}</h4>

        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100">
          {' '}
          vc | ba | corporate
        </p>

        <button onClick={() => navigate('/liste-resultats')} className="self-end">
          <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
        </button>
      </div>
      <div
        className="container rounded-r min-w-282 ml-3 mt-4 w-282 h-181 addBorder-l border-l-3 border-private-investors p-4 bg-research-card-preview
                     flex flex-col
                     hover:scale-y-115 hover:shadow-2xl
                     transform transition ease-out duration-200 
                     group
                    "
      >
        <div className="emetor-row flex">
          <p className="text-green-500 text-xs"> {emetor}</p>
          <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100">
            <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
            <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
          </div>
        </div>

        <h4 className="mt-10 w-4/5 fixed text-white font-bold text-xl ">{cardTitle}</h4>

        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100">
          {' '}
          vc | ba | corporate
        </p>

        <button onClick={() => navigate('/liste-resultats')} className="self-end">
          <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
        </button>
      </div>
      <div
        className="container rounded-r min-w-282 ml-3 mt-4 w-282 h-181 addBorder-l border-l-3 border-private-investors p-4 bg-research-card-preview
                     flex flex-col
                     hover:scale-y-115 hover:shadow-2xl
                     transform transition ease-out duration-200 
                     group
                    "
      >
        <div className="emetor-row flex">
          <p className="text-green-500 text-xs"> {emetor}</p>
          <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100">
            <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
            <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
          </div>
        </div>

        <h4 className="mt-10 w-4/5 fixed text-white font-bold text-xl ">{cardTitle}</h4>

        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100">
          {' '}
          vc | ba | corporate
        </p>

        <button onClick={() => navigate('/liste-resultats')} className="self-end">
          <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
        </button>
      </div>
      <div
        className="container rounded-r min-w-282 ml-3 mt-4 w-282 h-181 addBorder-l border-l-3 border-private-investors p-4 bg-research-card-preview
                     flex flex-col
                     hover:scale-y-115 hover:shadow-2xl
                     transform transition ease-out duration-200 
                     group
                    "
      >
        <div className="emetor-row flex">
          <p className="text-green-500 text-xs"> {emetor}</p>
          <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100">
            <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
            <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
          </div>
        </div>

        <h4 className="mt-10 w-4/5 fixed text-white font-bold text-xl ">{cardTitle}</h4>

        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100">
          {' '}
          vc | ba | corporate
        </p>

        <button onClick={() => navigate('/liste-resultats')} className="self-end">
          <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
        </button>
      </div>
      <div
        className="container rounded-r min-w-282 ml-3 mt-4 w-282 h-181 addBorder-l border-l-3 border-private-investors p-4 bg-research-card-preview
                     flex flex-col
                     hover:scale-y-115 hover:shadow-2xl
                     transform transition ease-out duration-200 
                     group
                    "
      >
        <div className="emetor-row flex">
          <p className="text-green-500 text-xs"> {emetor}</p>
          <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100">
            <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
            <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
          </div>
        </div>

        <h4 className="mt-10 w-4/5 fixed text-white font-bold text-xl ">{cardTitle}</h4>

        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100">
          {' '}
          vc | ba | corporate
        </p>

        <button onClick={() => navigate('/liste-resultats')} className="self-end">
          <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
        </button>
      </div>
      <div
        className="container rounded-r min-w-282 ml-3 mt-4 w-282 h-181 addBorder-l border-l-3 border-private-investors p-4 bg-research-card-preview
                     flex flex-col
                     hover:scale-y-115 hover:shadow-2xl
                     transform transition ease-out duration-200 
                     group
                    "
      >
        <div className="emetor-row flex">
          <p className="text-green-500 text-xs"> {emetor}</p>
          <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100">
            <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
            <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
          </div>
        </div>

        <h4 className="mt-10 w-4/5 fixed text-white font-bold text-xl ">{cardTitle}</h4>

        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100">
          {' '}
          vc | ba | corporate
        </p>

        <button onClick={() => navigate('/liste-resultats')} className="self-end">
          <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
        </button>
      </div>
      <div
        className="container rounded-r min-w-282 ml-3 mt-4 w-282 h-181 addBorder-l border-l-3 border-private-investors p-4 bg-research-card-preview
                     flex flex-col
                     hover:scale-y-115 hover:shadow-2xl
                     transform transition ease-out duration-200 
                     group
                    "
      >
        <div className="emetor-row flex">
          <p className="text-green-500 text-xs"> {emetor}</p>
          <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100">
            <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
            <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
          </div>
        </div>

        <h4 className="mt-10 w-4/5 fixed text-white font-bold text-xl ">{cardTitle}</h4>

        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100">
          {' '}
          vc | ba | corporate
        </p>

        <button onClick={() => navigate('/liste-resultats')} className="self-end">
          <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
        </button>
      </div>
      <div
        className="container rounded-r min-w-282 ml-3 mt-4 w-282 h-181 addBorder-l border-l-3 border-private-investors p-4 bg-research-card-preview
                     flex flex-col
                     hover:scale-y-115 hover:shadow-2xl
                     transform transition ease-out duration-200 
                     group
                    "
      >
        <div className="emetor-row flex">
          <p className="text-green-500 text-xs"> {emetor}</p>
          <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100">
            <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
            <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
          </div>
        </div>

        <h4 className="mt-10 w-4/5 fixed text-white font-bold text-xl ">{cardTitle}</h4>

        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100">
          {' '}
          vc | ba | corporate
        </p>

        <button onClick={() => navigate('/liste-resultats')} className="self-end">
          <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
        </button>
      </div>
      <div
        className="container rounded-r min-w-282 ml-3 mt-4 w-282 h-181 addBorder-l border-l-3 border-private-investors p-4 bg-research-card-preview
                     flex flex-col
                     hover:scale-y-115 hover:shadow-2xl
                     transform transition ease-out duration-200 
                     group
                    "
      >
        <div className="emetor-row flex">
          <p className="text-green-500 text-xs"> {emetor}</p>
          <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100">
            <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
            <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
          </div>
        </div>

        <h4 className="mt-10 w-4/5 fixed text-white font-bold text-xl ">{cardTitle}</h4>

        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100">
          {' '}
          vc | ba | corporate
        </p>

        <button onClick={() => navigate('/liste-resultats')} className="self-end">
          <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
        </button>
      </div>
      <div
        className="container rounded-r min-w-282 ml-3 mt-4 w-282 h-181 addBorder-l border-l-3 border-private-investors p-4 bg-research-card-preview
                     flex flex-col
                     hover:scale-y-115 hover:shadow-2xl
                     transform transition ease-out duration-200 
                     group
                    "
      >
        <div className="emetor-row flex">
          <p className="text-green-500 text-xs"> {emetor}</p>
          <div className="mb-2 w-full opacity-0 flex justify-end transition-opacity duration-200 group-hover:opacity-100">
            <img src={Star} alt="Icône d'étoile" className="mr-4 w-4 h-4 " />
            <img src={Trash} alt="Icône de poubelle" className="w-4 h-4" />
          </div>
        </div>

        <h4 className="mt-10 w-4/5 fixed text-white font-bold text-xl ">{cardTitle}</h4>

        <p className="uppercase opacity-0 mt-24 text-xs text-white transition-opacity duration-200 group-hover:opacity-100">
          {' '}
          vc | ba | corporate
        </p>

        <button onClick={() => navigate('/liste-resultats')} className="self-end">
          <img src={ArrowInvestors} alt="Icône flèche d'accès" className="fixed right-2 bottom-4" />
        </button>
      </div>
    </>
  );
};

export default Scrollable;
