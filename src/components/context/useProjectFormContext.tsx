import React from 'react';

export interface ProjetFormContextProps {
  description: string;
  handleDescriptionChange: (v: string) => void;
  error: boolean;
  thematics: string[];
  setThematics: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ProjetFormContext = React.createContext<ProjetFormContextProps>({
  description: '',
  handleDescriptionChange: () => {},
  error: false,
  thematics: [],
  setThematics: () => {}
});

export const ProjetFormContextProvider: React.FC = ({ ...props }) => {
  const [description, setDescription] = React.useState<string>('');
  const [thematics, setThematics] = React.useState<string[]>([]);
  const [error, setError] = React.useState<boolean>(false);

  const handleDescriptionChange = (v: string) => {
    setDescription(v);
    setError(!v.length);
  };

  return (
    <ProjetFormContext.Provider
      value={{
        description,
        handleDescriptionChange,
        thematics,
        setThematics,
        error
      }}
      {...props}
    />
  );
};

export const useProjetFormContext = () => React.useContext(ProjetFormContext);
