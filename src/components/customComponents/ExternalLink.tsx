import { FC } from 'react';
import ScreenReaderOnlyText from './ScreenReaderOnlyText';

interface ExternalLinkProps {
  href: string;
  content: string;
  className?: string;
}

const ExternalLink: FC<ExternalLinkProps> = ({ href, content, className }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {content}
      <ScreenReaderOnlyText content="Ouvre une nouvelle fenêtre" />
    </a>
  );
};

export default ExternalLink;
