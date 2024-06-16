function tracking() {
  if (window.backup === false) {
    primaryEnabler();
  } else if (window.backup === true) {
    backupEnabler();
  }
}

var primaryEnabler = function() {
  var clickArea = document.getElementById('backup');

  function initializeEnabler1() {
    if (Enabler.isInitialized()) {
      enablerInitHandler1();
    } else {
      Enabler.addEventListener(
        studio.events.StudioEvent.INIT,
        enablerInitHandler1
      );
    }
  }

  initializeEnabler1();

  function enablerInitHandler1() {
    /* Click Listeners */
    clickArea.addEventListener('click', clickAreaExitHandler);
  }

  function clickAreaExitHandler(e) {
    Enabler.exit('Call To Action', 'https://www.knowvms.co.uk/the-hypothalamus---vms');
  }
};

var backupEnabler = function() {
  function backupExitHandler(e) {
    Enabler.exit('Backup', 'https://www.knowvms.co.uk/the-hypothalamus---vms');
  }

  function backupMouseOver(e) {
    Enabler.startTimer('Backup Hover Timer');
  }

  function backupMouseOut(e) {
    Enabler.stopTimer('Backup Hover Timer');
  }

  function initializeEnabler2() {
    if (Enabler.isInitialized()) {
      enablerInitHandler2();
    } else {
      Enabler.addEventListener(
        studio.events.StudioEvent.INIT,
        enablerInitHandler2
      );
    }
  }

  initializeEnabler2();

  function enablerInitHandler2() {
    if (!document.addEventListener) {
      document.getElementById('backup').onclick = function(evt) {
        evt = evt || window.event;
        backupExitHandler();
      };
    } else {
      var backup = document.getElementById('backup');
      backup.addEventListener('click', backupExitHandler);
    }
  }
};

tracking();