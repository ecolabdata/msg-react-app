interface SVGProps {
  source: string;
}

const SVGIcon: React.FC<SVGProps> = ({ source }: SVGProps) => {
  return <img className="" src={source} alt="" />;
};

export default SVGIcon;
