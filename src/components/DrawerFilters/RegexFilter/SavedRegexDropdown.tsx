import * as React from 'react';
import { useEffect, useState } from 'react';
import { cx } from '../../../utils';
import Dropdown from '../../Dropdown/Dropdown';
import { IOption } from '../../../types';
import Modal from '../../Modal/Modal';

interface IProps {
  defaultValue: string;
  onValueChange: (newVal: string) => void;
}

const ADD_NEW_VALUE = 'add-new';

const allOption = {
  label: 'None',
  value: 'none',
};

const addOption: IOption = {
  label: 'Add new',
  value: ADD_NEW_VALUE,
};

const SavedRegexDropdown = ({ defaultValue, onValueChange }: IProps) => {
  const [options, setOptions] = useState<IOption[]>([allOption, addOption]);
  const [selected, setSelected] = useState(allOption.value);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {}, []);

  const onSelect = async (newVal: string) => {
    setSelected(newVal);
    if (newVal === ADD_NEW_VALUE) {
      setShowModal(true);
    } else {
    }
  };

  return (
    <div className={'drawer-filters__filter'}>
      <span className={'drawer-filters__label'}>Saved regexes</span>
      <Dropdown
        options={options}
        onSelect={onSelect}
        defaultValue={allOption.value}
        shadowChanged={true}
      />
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        hello world
      </Modal>
    </div>
  );
};

export default SavedRegexDropdown;
