import { ThematicsEnum } from 'model/ThematicsEnum';
import React from 'react';
import { useLocation } from 'react-router-dom';
export interface ProjetFormContextProps {
  description: string;
  error: boolean;
  thematics: ThematicsEnum[];
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  handleThematicsChange: (v: ThematicsEnum[] | null) => void;
}

export const ProjetFormContext = React.createContext<ProjetFormContextProps>({
  description: '',
  error: false,
  thematics: [],
  handleThematicsChange: () => { },
  setDescription: () => { }
});

export const ProjetFormContextProvider: React.FC<{ children?: React.ReactNode }> = ({ children, ...props }) => {
  const [description, setDescription] = React.useState<string>('');
  const [thematics, setThematics] = React.useState<ThematicsEnum[]>([]);
  const [error, setError] = React.useState<boolean>(false);
  const pathname = useLocation().pathname;

  React.useEffect(() => {
    setError(false);
  }, [pathname]);

  const handleThematicsChange = (v: ThematicsEnum[] | null) => {
    if (!v) {
      setError(true);
    } else {
      setError(false);
      setThematics(v);
    }
  };

  return (
    <ProjetFormContext.Provider
      value={{
        description,
        handleThematicsChange,
        thematics,
        setDescription,
        error
      }}
      {...props}
    >
      {children}
    </ProjetFormContext.Provider>
  );
};

export const useProjetFormContext = () => React.useContext(ProjetFormContext);
