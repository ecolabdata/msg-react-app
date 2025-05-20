import React, { ReactNode } from 'react';
import { PropsWithChildren } from 'react';

type Tab = {
  id: string;
  Button: ReactNode;
  Panel: ReactNode;
};
interface TabsProps {
  label: string;
  tabs: Tab[];
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ label, tabs, className }) => {
  const [tabSelected, setTabSelected] = React.useState(tabs[0].id);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = (e.target as HTMLButtonElement).id;
    setTabSelected(id);
  };

  return (
    <div className={`fr-tabs ${className}`}>
      <ul className="fr-tabs__list" role="tablist" aria-label={label}>
        {tabs.map(({ id, Button }) => (
          <TabButton key={id} id={id} handleClick={handleClick} isSelected={tabSelected === id}>
            {Button}
          </TabButton>
        ))}
      </ul>
      {tabs.map(({ id, Panel }) => (
        <TabPanel key={id} id={id} isSelected={tabSelected === id}>
          {Panel}
        </TabPanel>
      ))}
    </div>
  );
};

interface TabPanelProps {
  id: string;
  isSelected: boolean;
}

export const TabPanel: React.FC<PropsWithChildren<TabPanelProps>> = ({
  id,
  children,
  isSelected
}) => {
  return (
    <div
      id={`${id}-panel`}
      className={`fr-tabs__panel fr-tabs__panel--selected  ${!isSelected && 'hidden'}`}
      role="tabpanel"
      aria-labelledby={id}
      tabIndex={0}>
      {children}
    </div>
  );
};

interface TabButtonProps {
  id: string;
  isSelected: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const TabButton: React.FC<PropsWithChildren<TabButtonProps>> = ({
  id,
  children,
  handleClick,
  isSelected
}) => {
  return (
    <li role="presentation">
      <button
        onClick={handleClick}
        id={id}
        className="fr-tabs__tab"
        tabIndex={isSelected ? 0 : -1}
        role="tab"
        aria-selected={isSelected ? true : false}
        aria-controls={`${id}-panel`}>
        {children}
      </button>
    </li>
  );
};
