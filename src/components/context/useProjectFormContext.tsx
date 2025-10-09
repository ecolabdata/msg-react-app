import { ThematicsEnum } from 'model/ThematicsEnum';
import React from 'react';
import { useLocation } from 'react-router-dom';
export interface ProjetFormContextProps {
  description: string;
  error: boolean;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  advancedFilters: Record<string, string[]> | null;
  setAdvancedFilters: React.Dispatch<React.SetStateAction<Record<string, string[]> | null>>;
}

export const ProjetFormContext = React.createContext<ProjetFormContextProps>({
  description: '',
  error: false,
  setDescription: () => { },
  advancedFilters: null,
  setAdvancedFilters: () => { }
});

export const ProjetFormContextProvider: React.FC<{ children?: React.ReactNode }> = ({ children, ...props }) => {
  const [description, setDescription] = React.useState<string>('');
  const [advancedFilters, setAdvancedFilters] = React.useState<Record<string, string[]> | null>(null);
  const [error, setError] = React.useState<boolean>(false);
  const pathname = useLocation().pathname;

  React.useEffect(() => {
    setError(false);
  }, [pathname]);



  return (
    <ProjetFormContext.Provider
      value={{
        description,
        setDescription,
        error,
        advancedFilters,
        setAdvancedFilters
      }}
      {...props}
    >
      {children}
    </ProjetFormContext.Provider>
  );
};

export const useProjetFormContext = () => React.useContext(ProjetFormContext);
