import { ThematicsEnum } from 'model/ThematicsEnum';
import React from 'react';

export interface ProjetFormContextProps {
  description: string;
  handleDescriptionChange: (v: string) => void;
  error: boolean;
  thematics: ThematicsEnum[];
  setThematics: React.Dispatch<React.SetStateAction<ThematicsEnum[]>>;
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
  const [thematics, setThematics] = React.useState<ThematicsEnum[]>([]);
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
