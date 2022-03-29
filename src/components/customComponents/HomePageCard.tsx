import { ReactElement } from "react";
import { CardType } from "../../model/CardType";

interface HomePageCardProps {
    cardTypeData : CardType
}

const HomePageCard :React.FC<HomePageCardProps> = (props : HomePageCardProps) => {
    const {SVGLogo, title, description, color} = props.cardTypeData;
    return (
        <>
            <div className="card-container
                w-4/12 
                p-4
                flex flex-col items-center
                ">
                    <div  style={{color}}>
                        <SVGLogo width="25" height="25"/>
                    </div>
                    <div className={`card-title-container
                       w-227 h-204
                       p-43
                       flex flex-col items-center 
                    `}>
                        <h3 className="block mt-2 max-w-fit text-center text-xl">{title}</h3>
                        <p className="mt-2 text-center text-base">{description}</p>

                    </div>
            </div>
        </>
    )
    
}
    
export default HomePageCard;


