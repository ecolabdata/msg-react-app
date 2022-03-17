import { Popover, Transition } from '@headlessui/react'
import Chevron from './../../assets/icons/chevron.svg'
import Logout from './../../assets/icons/logout.svg'
import Panda from './../../assets/images/panda.jpg'
import {useDispatch} from 'react-redux'


interface AvatarPopOverProps {
    rotation?:string,
    avatar?:string
}

const AvatarPopOver: React.FC<AvatarPopOverProps> = ({rotation, avatar}:AvatarPopOverProps) => { 
    
    // const dispatch = useDispatch();

    const rotateChevron = () => {
        // dispatch(userActions.rotatePopOverChevron())
    }

    return (

        
        <Popover className="relative">
            <Popover.Button className="w-44 p-4 flex " >
                <img className="rounded-full  mt-2 mr-1.5 w-6 h-6 bg-blue-600" src={avatar ? avatar : Panda} alt="Avatar de l'utilisateur connecté"/>
                <p className="mt-1.5 mr-1.5">Constantin</p>
                <img onClick={() => rotateChevron()} className={`${rotation}  mt-2 w-6 h-6`} src={Chevron} alt='chevron'/>
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
                        <a href="/deconnexion">Deconnexion</a>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
        
    ) 
}; 

export default AvatarPopOver;