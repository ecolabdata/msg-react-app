import React from 'react';

export interface ProjetFormContextProps {
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  thematics: string[];
  setThematics: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ProjetFormContext = React.createContext<ProjetFormContextProps>({
  description: '',
  setDescription: () => {},
  thematics: [],
  setThematics: () => {}
});

export const ProjetFormContextProvider: React.FC = ({ ...props }) => {
  const [description, setDescription] = React.useState<string>('');
  const [thematics, setThematics] = React.useState<string[]>([]);

  return (
    <ProjetFormContext.Provider
      value={{
        description,
        setDescription,
        thematics,
        setThematics
      }}
      {...props}
    />
  );
};

export const useProjetFormContext = () => React.useContext(ProjetFormContext);
