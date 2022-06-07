import { ReactElement } from "react";
import { NavLink } from 'react-router-dom';
import { CardType } from "../../model/CardType";

interface HomePageCardProps {
    cardTypeData: CardType
}

const HomePageCard: React.FC<HomePageCardProps> = (props: HomePageCardProps) => {
    const { SVGLogo, title, description, color, version, searchLink } = props.cardTypeData;
    const isAlpha = version === "alpha"
    const opacity = isAlpha ? 0.15 : 1
    return (
        <div style={{ flex: "1 1 33.33333%"}}  className="flex flex-col items-center relative">
            <div style={{
                width: "300px", height: "238px"
            }} className="card-container
                h-content
                p-5
                flex flex-col items-center relative
                ">
                {/*isAlpha*/ false && <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
                    <div
                        className="bg-[rgba(0,0,0,0.6)] rounded-md "
                     style={{
                         width: "calc(100% - 25px)",
                         height: "calc(100% - 25px)"
                    }}>
                        
                    </div>
                </div>}

                <div style={{ color, opacity}}>
                    <SVGLogo width="25" height="25" />
                </div>
                <div className={`card-title-container
                       w-227
                       p-43
                       flex flex-col items-center 
                    `}>
                    <h3 style={{opacity}} className="block mt-4 max-w-fit text-center text-xl font-bold">{title}</h3>
                    {version === "alpha" && <div style={{backgroundColor: color,zIndex: 100}} className="px-1 rounded-md">
                        Bientôt
                    </div>}
                    <p style={{opacity}} className="mt-2 w-[245px] text-center text-base">{description}</p>
                    <NavLink to={searchLink}>voir tout</NavLink>
                </div>
            </div>
        </div>
    )

}

export default HomePageCard;


