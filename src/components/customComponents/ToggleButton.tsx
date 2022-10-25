import { Switch } from '@headlessui/react';
import { useState } from 'react';
import classNames from 'classnames';

const ToggleButton: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={classNames(
        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-private-investors rounded-full cursor-pointer transition-colors ease-in-out duration-200',
        { 'bg-private-investors': enabled },
        { 'bg-gray-200': !enabled }
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={classNames(
          'mt-0.5 pointer-events-none inline-block h-5 w-5 rounded-full bg-transparent shadow transform ring-0 transition ease-in-out duration-200',
          { 'translate-x-5': enabled },
          { 'translate-x-0': !enabled }
        )}
      >
        <span
          className="fr-icon-success-line h-max bg-black mt-0.5 mt-05 text-private-investors"
          aria-hidden="true"
        />
      </span>
    </Switch>
  );
};

export default ToggleButton;
