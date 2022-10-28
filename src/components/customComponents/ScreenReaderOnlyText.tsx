interface ScreenReaderOnlyTextProps extends React.HTMLAttributes<HTMLElement> {
  content: string;
}

export const ScreenReaderOnlyText: React.FC<ScreenReaderOnlyTextProps> = ({
  content,
  ...props
}: ScreenReaderOnlyTextProps) => {
  return (
    <span className="sr-only" {...props}>
      {content}
    </span>
  );
};

export default ScreenReaderOnlyText;
