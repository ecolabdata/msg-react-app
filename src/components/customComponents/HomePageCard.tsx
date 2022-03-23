export interface HomePageCardProps {
    SVGLogo: () => JSX.Element,
    title: string,
    description: string,
}


const HomePageCard:React.FC<HomePageCardProps> = ({SVGLogo, title, description}) => {
    
    return (
        <>
            <div className="card-container
                w-4/12 
                p-4
                flex flex-col items-center
                ">
                    <SVGLogo/>
                    <div id={`
                        ${SVGLogo().props.children.key === 'SIGNAL'  ? 'SIGNAL' : ''}
                        ${SVGLogo().props.children.key === 'CALENDAR'  ? 'CALENDAR' : ''}
                        ${SVGLogo().props.children.key === 'ROCKET'  ? 'ROCKET' : ''}

                    `} className={`card-title-container
                       ${SVGLogo().props.children.key === 'SIGNAL'  ? '' : ''}
                       ${SVGLogo().props.children.key === 'CALENDAR'  ? 'mt-2.5' : ''}
                       ${SVGLogo().props.children.key === 'EURO'  ? '-mt-1.5' : ''}
                       ${SVGLogo().props.children.key === 'ROCKET'  ? 'mt-1.5' : ''}
                       w-227 h-204
                       p-4
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


