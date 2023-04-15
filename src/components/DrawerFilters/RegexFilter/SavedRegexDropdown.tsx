import * as React from 'react';
import { MouseEvent, useEffect, useState } from 'react';
import Dropdown from '../../Dropdown/Dropdown';
import { IOption, ISavedRegex } from '../../../types';
import Modal from '../../Modal/Modal';
import Button from '../../Button/Button';
import { SAVED_REGEX_KEY } from '../../../api';

interface IProps {
  onValueChange: (newVal: string) => void;
  currentRegex?: string;
}

const allOption = {
  label: 'None',
  value: '',
};

const addOption: IOption = {
  label: 'Add new',
  value: 'add-new',
  rendered: <span className={'saved-regex__add-new-option link'}>Add new</span>,
};

const loadList = () => {
  return JSON.parse(localStorage.getItem(SAVED_REGEX_KEY) ?? '[]') as ISavedRegex[];
};
const saveList = (value: ISavedRegex[]) => localStorage.setItem(SAVED_REGEX_KEY, JSON.stringify(value));

const getNewRegex = (): ISavedRegex => ({
  key: window.self.crypto.randomUUID(),
  name: '',
  value: '',
});

interface ISavedRegexOptionProps {
  regex: ISavedRegex;
  onEditClick: (regex: ISavedRegex) => void;
}

const SavedRegexOption = ({ regex, onEditClick }: ISavedRegexOptionProps) => {
  const onClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    onEditClick(regex);
  };
  return (
    <div className={'saved-regex__option'}>
      <span>{regex.name}</span>
      <span className={'link'} onClick={onClick}>
        edit
      </span>
    </div>
  );
};
const loadedRegexes = loadList();

const SavedRegexDropdown = ({ onValueChange, currentRegex }: IProps) => {
  const [regexes, setRegexes] = useState<ISavedRegex[]>(loadedRegexes);
  const [options, setOptions] = useState<IOption[]>([allOption, addOption]);
  const [selected, setSelected] = useState<ISavedRegex | undefined>(
    loadedRegexes.find((r) => r.value === currentRegex),
  );
  const [nextRegex, setNextRegex] = useState<ISavedRegex>(getNewRegex());
  const [showModal, setShowModal] = useState(false);

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

  const regexToOption = (regex: ISavedRegex): IOption => ({
    label: regex.name,
    value: regex.key,
    rendered: <SavedRegexOption regex={regex} onEditClick={onEditClick} />,
  });

  useEffect(() => {
    if (currentRegex?.length === 0) {
      setSelected(undefined);
    }
  }, [currentRegex]);

  useEffect(() => {
    setOptions([allOption, addOption, ...regexes.map(regexToOption)]);
    saveList(regexes);
  }, [regexes]);

  const onSelect = (newVal: string) => {
    if (newVal === addOption.value) {
      setNextRegex(getNewRegex());
      setShowModal(true);
    } else if (newVal === '') {
      onValueChange('');
    } else {
      const existing = regexes.find((r) => r.key === newVal);
      if (existing) {
        setSelected(existing);
        onValueChange(existing.value);
      }
    }
  };

  const onEditClick = (regex: ISavedRegex) => {
    setNextRegex(regex);
    setShowModal(true);
  };

  const onDelete = () => {
    // TODO: confirm
    setRegexes((prevState) => {
      const existingIndex = prevState.findIndex((r) => r.key === nextRegex.key);
      if (existingIndex > -1) {
        prevState.splice(existingIndex, 1);
      }
      return [...prevState];
    });
    onValueChange('');
    setNextRegex(getNewRegex());
    setShowModal(false);
  };

  const onCancel = () => {
    // TODO: reset values
    setShowModal(false);
  };

  const onSave = () => {
    setRegexes((prevState) => {
      const existingIndex = prevState.findIndex((r) => r.key === nextRegex.key);
      if (existingIndex > -1) {
        prevState.splice(existingIndex, 1, nextRegex);
      } else {
        prevState.push(nextRegex);
      }
      return [...prevState];
    });
    setSelected(nextRegex);
    onValueChange(nextRegex.value);
    setNextRegex(getNewRegex());

    setShowModal(false);
  };

  const onNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNextRegex((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  const onValueInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setNextRegex((prevState) => ({
      ...prevState,
      value: e.target.value,
    }));

  return (
    <div className={'drawer-filters__filter'}>
      <span className={'drawer-filters__label'}>Saved regexes</span>
      <Dropdown
        options={options}
        onSelect={onSelect}
        value={selected?.key ?? ''}
        defaultValue={allOption.value}
        shadowChanged={true}
        selectOnOptionsChange={false}
      />
      <Modal title={'Add new regex'} show={showModal} onClose={() => setShowModal(false)}>
        <div className={'saved-regex__add-new'}>
          <div className={'saved-regex__add-new-wrapper'}>
            <div className={'saved-regex__input-wrapper'}>
              <label>Name</label>
              <input autoFocus={true} value={nextRegex.name} onChange={onNameInputChange} />
            </div>
            <div className={'saved-regex__input-wrapper'}>
              <label>Regex</label>
              <textarea value={nextRegex.value} onChange={onValueInputChange} />
            </div>
          </div>
          <div className={'saved-regex__actions'}>
            {regexes.findIndex((r) => r.key === nextRegex.key) > -1 && (
              <Button onClick={onDelete} type={'danger'}>
                Delete
              </Button>
            )}
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
