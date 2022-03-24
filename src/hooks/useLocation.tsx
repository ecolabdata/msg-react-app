import React from 'react';
import { Location, useLocation } from 'react-router-dom';

export const useLocationChange = (action: (location: Location) => void) => {
    const location = useLocation()
    React.useEffect(() => { action(location) }, [location])
}
