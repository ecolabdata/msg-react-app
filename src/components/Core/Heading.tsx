export interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  align?: 'left' | 'center' | 'right';
  inSmallContainer?: boolean;
  customClasses?: string;
  children?: React.ReactNode;
}
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4';

const Heading: React.FC<HeadingProps> = ({
  level = 1,
  children,
  align = 'center',
  inSmallContainer = false,
  customClasses,
  ...props
}) => {
  const HeadingTag = `h${level}` as HeadingTag;

  const alignClass = () => {
    switch (align) {
      case 'center':
        return 'text-center mx-auto';
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
    }
  };

  const sizeClass = () => {
    switch (level) {
      case 1:
        return 'text-4xl';
      case 2:
        return 'text-3xl';
      case 3:
        return 'text-2xl';
      case 4:
        return 'text-xl';
    }
  };

  return (
    <>
      <HeadingTag
        className={`${alignClass()} my-4 ${inSmallContainer ? 'max-w-headerSize' : 'w-full'
          } font-bold ${sizeClass()} ${customClasses}`}
        {...props}>
        {' '}
        {children}{' '}
      </HeadingTag>
    </>
  );
};

export default Heading;
