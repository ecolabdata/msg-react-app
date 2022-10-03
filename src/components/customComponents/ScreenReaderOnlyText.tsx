interface ScreenReaderOnlyTextProps {
  content: string;
}

export const ScreenReaderOnlyText: React.FC<ScreenReaderOnlyTextProps> = ({
  content
}: ScreenReaderOnlyTextProps) => {
  return (
    <span
      style={{
        position: 'absolute',
        left: -10000,
        top: 'auto',
        width: 1,
        height: 1,
        overflow: 'hidden'
      }}>
      {content}
    </span>
  );
};

export default ScreenReaderOnlyText;
