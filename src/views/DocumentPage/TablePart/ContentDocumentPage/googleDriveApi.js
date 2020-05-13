const CLIENT_ID =
  '923513358062-8s222ro5m2d9ruicuhvi98uq7h6gd7mr.apps.googleusercontent.com';
const API_KEY = 'AIzaSyC0iTTmOVJrNX4PXjD8C4ObSGOXCUwJchg';
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
];
const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';


// add script to file index.html and init service gg drive
export const initGoogleDrive = (
  checkingService,
  successCallback,
  failCallback
) => {
  if (checkingService) checkingService(true);
  const driveScript = document.createElement('script');
  driveScript.async = true;
  driveScript.defer = true;
  driveScript.type = 'text/javascript';
  driveScript.src = 'https://apis.google.com/js/api.js';
  driveScript.id = 'google-drive-script';
  window.document.body.appendChild(driveScript);
  driveScript.addEventListener('load', () => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        })
        .then(
          function() {
            if (checkingService) checkingService(false);
            if (successCallback) successCallback(true);
          },
          function(error) {
            if (checkingService) checkingService(false);
            if (failCallback) failCallback(error);
          }
        );
    });
  });
};

// check status login
export const checkSignInStatus = () => {
  if (window.gapi) {
    return window.gapi.auth2.getAuthInstance().isSignedIn.get();
  } else {
    return false;
  }
};

// Open page to Sigin google account
export const actionAuthGoogleDrive = (successCallback, failCallback) => {
  if (window.gapi) {
    window.gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(
        res => {
          if (successCallback) successCallback(res);
        },
        err => {
          if (failCallback) failCallback(err);
        }
      );
  }
};

// action logout google account
export const actionSignoutGoogleDrive = (successCallback, failCallback) => {
  if (window.gapi) {
    window.gapi.auth2
      .getAuthInstance()
      .signOut()
      .then(
        res => {
          if (successCallback) successCallback(res);
        },
        err => {
          if (failCallback) failCallback(err);
        }
      );
  }
};
