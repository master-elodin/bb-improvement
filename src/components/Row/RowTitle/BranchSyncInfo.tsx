import { getCommitsBehind, getConflicts, getSyncStatus, ISyncInfo, syncWithDest } from '../../../api';
import { useEffect, useState } from 'react';
import Modal from '../../Modal/Modal';
import * as React from 'react';
import { IRow } from '../../../types';
import Button from '../../Button/Button';
import Spinner from '../../Spinner/Spinner';

interface IProps {
  row: IRow;
}

const defaultValue = { behind: 0, behind_truncated: false };

const BranchSyncInfo = ({ row }: IProps) => {
  const [branchSyncInfo, setBranchSyncInfo] = useState<ISyncInfo>(defaultValue);
  const { behind, behind_truncated } = branchSyncInfo;
  const [modalOpen, setModalOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // use undefined to see if we've loaded once
  const [conflictPaths, setConflictPaths] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncLoading, setIsSyncLoading] = useState(false);

  const loadSyncData = async (id: number) => {
    try {
      const res = await getCommitsBehind(id);
      setBranchSyncInfo(res);
    } catch (err) {
      console.error('Failed loading branch status', err);
    }
  };
  useEffect(() => {
    loadSyncData(row.id);
  }, [row.id]);

  useEffect(() => {
    if (behind > 0 && modalOpen && !conflictPaths) {
      const load = async () => {
        setIsLoading(true);
        try {
          const conflicts = await getConflicts(row.id);
          setConflictPaths(conflicts.map((c) => c.path));
        } catch (err) {
          console.log('Failed loading conflicts', err);
        } finally {
          setIsLoading(false);
        }
      };
      load();
    }
  }, [behind, modalOpen, conflictPaths, row.id]);

  if (behind === 0) {
    return null;
  }
  let className = 'branch-sync';
  if (behind > 50) {
    className += ' branch-sync--warn';
  }

  const closeModal = () => {
    setModalOpen(false);
    setShowConfirm(false);
    setIsSyncLoading(false);
  };

  const doSync = async () => {
    setIsSyncLoading(true);
    try {
      const response = await syncWithDest(row.source.branch.name, row.destination.branch.name);
      let numTries = 0;
      const statusInterval = setInterval(async () => {
        if (numTries++ >= 10) {
          clearInterval(statusInterval);
        } else {
          const isComplete = await getSyncStatus(response.url);
          if (isComplete) {
            setBranchSyncInfo({ behind: 0, behind_truncated: false });
            closeModal();
            clearInterval(statusInterval);
          }
        }
      }, 800);
    } catch (err) {
      console.error('Failed doing sync', err);
      setIsSyncLoading(false);
    }
  };

  return (
    <>
      <span className={className} onClick={() => setModalOpen(true)}>
        [<b>{behind}</b>
        {behind_truncated && '+'} commits behind]
      </span>
      <Modal show={modalOpen} onClose={closeModal} title={'Branch sync'}>
        <div className={'branch-sync__summary'}>
          <div className={'branch-sync__title'}>{row.title}</div>
          <div className={'branch-sync__content'}>
            <div className={'branch-sync__detail'}>
              <span>
                <b>{behind} commits</b> behind <b>{row.destination.branch.name}</b>
              </span>
              {isSyncLoading && <Spinner size={'1em'} />}
            </div>
            {isLoading && <Spinner size={'1.5em'} className={'branch-sync__loading-indicator'} />}
            {!isLoading && conflictPaths && conflictPaths.length > 0 && (
              <div className={'branch-sync__conflicts-container'}>
                <div>Found the following conflicts:</div>
                <ul>
                  {conflictPaths.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {!isLoading && (
            <div className={'branch-sync__actions'}>
              <Button onClick={closeModal}>Cancel</Button>
              {showConfirm && (
                <Button onClick={doSync} type={'danger'} disabled={isSyncLoading}>
                  Confirm Sync
                </Button>
              )}
              <Button
                onClick={() => setShowConfirm(true)}
                type={'primary'}
                disabled={(conflictPaths && conflictPaths.length > 0) || showConfirm}>
                Sync
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default BranchSyncInfo;
