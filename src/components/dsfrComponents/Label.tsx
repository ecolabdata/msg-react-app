interface LabelProps { 
    bgColor: string,
    textColor: string,
} 

const Label: React.FC<LabelProps> = ({bgColor,textColor, children}) => { 

    return (

        <>
            <p className={`fr-badge m-2 rounded-2xl px-4 py-1 capitalize font-normal ${textColor} bg-[${bgColor}]`}>{children}</p>
        </>
    ) 
}; 

export default Label;