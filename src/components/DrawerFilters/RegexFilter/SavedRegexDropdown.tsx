import * as React from 'react';
import { useEffect, useState } from 'react';
import { cx } from '../../../utils';
import Dropdown from '../../Dropdown/Dropdown';
import { IOption, ISavedRegex } from '../../../types';
import Modal from '../../Modal/Modal';
import Button from '../../Button/Button';
import { SAVED_REGEX_KEY } from '../../../api';

interface IProps {
  onValueChange: (newVal: string) => void;
}

const ADD_NEW_VALUE = 'add-new';

const allOption = {
  label: 'None',
  value: '',
};

const addOption: IOption = {
  label: 'Add new',
  value: ADD_NEW_VALUE,
};

// TODO: load saved

const loadList = () => {
  const saved = JSON.parse(localStorage.getItem(SAVED_REGEX_KEY) ?? '[]') as ISavedRegex[];
  return saved.map((savedRegex) => ({ label: savedRegex.name, value: savedRegex.value }));
};
const saveList = (value: ISavedRegex[]) => localStorage.setItem(SAVED_REGEX_KEY, JSON.stringify(value));

const SavedRegexDropdown = ({ onValueChange }: IProps) => {
  const [options, setOptions] = useState<IOption[]>([allOption, addOption, ...loadList()]);
  const [selected, setSelected] = useState(allOption.value);
  const [showModal, setShowModal] = useState(false);
  const [newRegexName, setNewRegexName] = useState('');
  const [newRegexValue, setNewRegexValue] = useState('');

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === 'Enter') {
        onSave();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (selected !== ADD_NEW_VALUE) {
      onValueChange(selected);
    }
  }, [selected]);

  const onSelect = (newVal: string) => {
    if (newVal === ADD_NEW_VALUE) {
      setShowModal(true);
    } else {
      setSelected(newVal);
    }
  };

  const onCancel = () => {
    // TODO: reset selected
    setShowModal(false);
  };

  const onSave = () => {
    const newOption = { label: newRegexName, value: newRegexValue };
    setOptions((prevState) => {
      const newOptions = [...prevState, newOption];
      saveList(newOptions.slice(2).map((o) => ({ name: o.label, value: o.value })));
      return newOptions;
    });
    setSelected(newRegexValue);
    setShowModal(false);
  };

  return (
    <div className={'drawer-filters__filter'}>
      <span className={'drawer-filters__label'}>Saved regexes</span>
      <Dropdown
        options={options}
        value={selected}
        onSelect={onSelect}
        defaultValue={allOption.value}
        shadowChanged={true}
        selectOnOptionsChange={false}
      />
      <Modal title={'Add new regex'} show={showModal} onClose={() => setShowModal(false)}>
        <div className={'saved-regex__add-new'}>
          <div className={'saved-regex__add-new-wrapper'}>
            <div className={'saved-regex__input-wrapper'}>
              <label>Name</label>
              <input autoFocus={true} value={newRegexName} onChange={(e) => setNewRegexName(e.target.value)} />
            </div>
            <div className={'saved-regex__input-wrapper'}>
              <label>Regex</label>
              <textarea value={newRegexValue} onChange={(e) => setNewRegexValue(e.target.value)} />
            </div>
          </div>
          <div className={'saved-regex__actions'}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={onSave} type={'primary'}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SavedRegexDropdown;
