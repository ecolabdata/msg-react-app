interface DetailsHeaderProps {
  title: string;
  subtitle: string;
  tag: string;
  color?: string;
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({ title, subtitle, tag, color }) => {
  return (
    <div>
      <h1 className="mt-4 w-full font-bold text-4xl">{title}</h1>
      <p className="">{subtitle}</p>
      <p className="">{tag}</p>
    </div>
  );
};

export default DetailsHeader;
