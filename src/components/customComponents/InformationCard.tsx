interface InformationCardProps {
  title: number | string;
  subtitle: string;
  description: string;
  className?: string;
}

export const InformationCard: React.FC<InformationCardProps> = ({
  title,
  subtitle,
  description,
  className
}) => {
  return (
    <div className={`${className} flex flex-col items-center bg-input-background p-4 mb-2`}>
      <h3 className="text-4xl text-red-marianne-625 mb-4">{title}</h3>
      <p>{subtitle}</p>
      <p>{description}</p>
    </div>
  );
};
