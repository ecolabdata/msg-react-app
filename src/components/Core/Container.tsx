type AsContainerTag = 'section' | 'div' | 'ul';

export interface ContainerProps {
  children?: React.ReactNode;
  customClasses?: string;
  isFlexCol?: boolean;
  as?: AsContainerTag;
}

const Container: React.FC<ContainerProps> = ({
  children,
  customClasses,
  isFlexCol = false,
  as = 'section',
  ...props
}) => {
  const ContainerTag = as;

  return (
    <>
      <ContainerTag
        className={`container my-4 ${customClasses ?? ''} ${isFlexCol && 'flex flex-col items-center mb-8'}`}
        {...props}>
        {children}
      </ContainerTag>
    </>
  );
};

export default Container;
