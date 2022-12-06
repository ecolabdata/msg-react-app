import { PropsWithChildren } from 'react';

interface TabPanelProps {
  id: string;
  labelId: string;
}

export const TabPanel: React.FC<PropsWithChildren<TabPanelProps>> = ({ id, labelId, children }) => {
  return (
    <div
      id={id}
      className="fr-tabs__panel fr-tabs__panel--selected"
      role="tabpanel"
      aria-labelledby={labelId}
      tabIndex={0}>
      {children}
    </div>
  );
};
