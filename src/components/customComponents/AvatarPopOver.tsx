import { Popover, Transition } from '@headlessui/react'
import Chevron from './../../assets/icons/chevron.svg'
import Logout from './../../assets/icons/logout.svg'
import Panda from './../../assets/images/panda.jpg'
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {appActions} from './../../_actions/app.actions';
import {RootState} from '../../_reducers/root.reducer';
import { useEffect } from 'react';
interface AvatarPopOverProps {
    rotation?:string,
    avatar?:string
}

const AvatarPopOver: React.FC<AvatarPopOverProps> = ({avatar}) => { 
    
    const dispatch = useDispatch();
    const { popOverChevronRotate } = useSelector( (state:RootState ) => state.appState);
    

    const rotateChevron = () => {
        console.log('dispatch x1 ');
        dispatch(appActions.rotatePopOverChevron())
    }

    return (

        
        <Popover className="relative" onClick={() => rotateChevron()}>
            <Popover.Button className="w-44 p-4 flex" >
                <img className="rounded-full  mt-2 mr-1.5 w-6 h-6 bg-blue-600" src={avatar||Panda} alt="Avatar de l'utilisateur connecté"/>
                <p className="mt-1.5 mr-1.5">Constantin</p>
                <span 
                    className={`
                        fr-fi-arrow-right-s-line mt-2
                        ${popOverChevronRotate ? "rotate-90" : ""}`
                    } 
                    aria-hidden="true">
                </span>
            </Popover.Button>

            <Transition
                enter="transition duration-500 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Popover.Panel className="absolute z-10 w-40 h-15 p-4 rounded-md  bg-gray-100  ">
                    <div className=" flex justify-evenly hover:bg-indigo-200">
                        <img  className="w-6" src={Logout} alt="Icône de déconnexion"/>
                        <Link to="/authentification">Deconnexion</Link>
                    </div>
                </Popover.Panel>
                
            </Transition>
        </Popover>
        
    ) 
}; 

export default AvatarPopOver;