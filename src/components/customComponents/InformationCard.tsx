interface InformationCardProps {
  title: number | string;
  subtitle: string;
  description?: string;
  className?: string;
}

export const InformationCard: React.FC<InformationCardProps> = ({
  title,
  subtitle,
  description,
  className
}) => {
  return (
    <div className={`${className} flex flex-col items-center p-4 m-4`}>
      <h3 className="text-4xl font-semibold text-red-marianne-625 mb-4">{title}</h3>
      <p>{subtitle}</p>
      {description && <p>{description}</p>}
    </div>
  );
};
