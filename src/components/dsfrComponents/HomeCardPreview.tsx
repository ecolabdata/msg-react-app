import { CardType } from 'model/CardType';

type HomeCardMiniProps = {
  cardTypeData: CardType;
};

export const HomeCardPreview: React.FC<HomeCardMiniProps> = ({ cardTypeData }) => {
  const { SVGLogo, title } = cardTypeData;

  return (
    <li className={'flex gap-2 items-center'}>
      <SVGLogo width="40" height="40" aria-hidden="true" />
      <p className="text-s">{title}</p>
    </li>
  );
};

export default HomeCardPreview;
