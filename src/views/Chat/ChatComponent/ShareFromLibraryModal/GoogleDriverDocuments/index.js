import { actionFetchListGoogleDocument, actionSelectedFolder, toggleSingoutGoogle } from 'actions/documents';
import { actionChangeBreadCrumbs } from 'actions/system/system';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { actionAuthGoogleDrive, checkSignInStatus, initGoogleDrive } from 'views/DocumentPage/TablePart/ContentDocumentPage/googleDriveApi';
import LoginGoogleDrive from '../LoginGoogleDrive';
import './styles.scss';

function GoogleDriverDocuments({ isLogedInGoogleDriver, setLogedInGoogleDriver }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const breadCrumbs = useSelector(state => state.system.breadCrumbs);
  const isShowBtnSignoutGoogle = isLogedInGoogleDriver
  const settingDate = useSelector(state => state.setting.settingDate)

  const [isLogged, setLogged] = useState(false);
  const [isCheckingService, setCheckingService] = useState(true);
  const [sortType, setSortType] = useState('desc');
  const [defaultDate, setDefaultDate] = useState('');

  useEffect(() => {
    return () => {
      dispatch(actionSelectedFolder({}));
      dispatch(actionChangeBreadCrumbs([]));
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const formatDate = settingDate.find(item => item.selected === true);
    setDefaultDate(formatDate.date_format);
    // eslint-disable-next-line
  }, [settingDate]);

  const updateSigninStatus = isSignedIn => {
    // if login success
    if (isSignedIn) {
      // show button Logout gg Drive
      dispatch(toggleSingoutGoogle(true));
      setLogged(true);
      // Get list file gg Drive
      dispatch(actionFetchListGoogleDocument());
    } else {
      setLogged(false);
      // Hide button Logout gg Drive
      dispatch(toggleSingoutGoogle(false));
    }
    if (isLogedInGoogleDriver != isSignedIn) {
      setLogedInGoogleDriver(true)
    }
  };

  useEffect(() => {
    const driveScript = document.getElementById('google-drive-script');
    // check script google drive added or not to file index.html
    if (!driveScript) {
      // add script and check login status
      initGoogleDrive(
        isChecking => {
          setCheckingService(isChecking);
        },
        () => {
          updateSigninStatus(checkSignInStatus());
        },
        err => {
          console.log('LOAD GOOGLE DRIVE FAIL=', err);
        }
      );
    } else {
      setCheckingService(false);
      // check login status
      updateSigninStatus(checkSignInStatus());
    }
    // eslint-disable-next-line
  }, []);

  return ((!isLogged || !isShowBtnSignoutGoogle) && !isCheckingService &&
    <LoginGoogleDrive
      onLogin={() =>
        actionAuthGoogleDrive(() => {
          updateSigninStatus(checkSignInStatus());
        })
      }
    />
  )
}

export default GoogleDriverDocuments;