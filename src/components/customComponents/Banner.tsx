import { SURVEY_URL } from "utils/constants";

export const Banner = () => {
    return (
        <div className="mt-4 mx-8 sm:mx-16">
            <p className="text-center italic text-sm">Mes Services Greentech est en version bêta. Pour nous aider à améliorer l’expérience, vous pouvez répondre à <a href={SURVEY_URL} target="_blank" rel="noopener noreferrer">cette courte enquête.</a></p>
        </div>
    );
};