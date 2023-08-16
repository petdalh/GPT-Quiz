import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

interface DropdownMenuProps {
    setSubject: (subject: number) => void;
}

function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ setSubject }) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
        <div>
            <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-800 px-3 py-2.5 text-sm font-medium text-white shadow-sm  ring-inset  hover:bg-gray-900">
            Velg fag
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Menu.Button>
        </div>

        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
                <Menu.Item>
                {({ active }) => (
                    <button
                        onClick={() => setSubject(0)}
                        className={classNames(
                            active ? 'bg-gray-900 text-white w-full' : 'text-white',
                            'block px-4 py-2 text-sm w-full text-left'
                        )}
                    >
                        Algoritmer og Datastrukturer
                    </button>
                )}
                </Menu.Item>
                <Menu.Item>
                {({ active }) => (
                    <button
                        onClick={() => setSubject(1)}
                        className={classNames(
                            active ? 'bg-gray-900 text-white w-full text-left' : 'text-white',
                            'block px-4 py-2 text-sm w-full text-left'
                        )}
                    >
                        Statistikk
                    </button>
                )}
                </Menu.Item>
            </div>
            </Menu.Items>
        </Transition>
        </Menu>
    );
}

export default DropdownMenu;

