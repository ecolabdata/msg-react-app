interface ScreenReaderOnlyTextProps extends React.HTMLAttributes<HTMLElement> {
  content: string;
}

export const ScreenReaderOnlyText: React.FC<ScreenReaderOnlyTextProps> = ({
  content,
  ...props
}: ScreenReaderOnlyTextProps) => {
  return (
    <span
      {...props}
      style={{
        position: 'absolute',
        left: -10000,
        top: 'auto',
        width: 1,
        height: 1,
        overflow: 'hidden'
      }}
    >
      {content}
    </span>
  );
};

export default ScreenReaderOnlyText;
