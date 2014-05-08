Logger
======

Console for Javascript

Example:

    Logger.log('hello world');

    Logger.error('error for some reason!');

    Logger.time('A process');
    // calculation ...
    Logger.timeEnd('A process');

    //The console will be popped up by ctrl+alt+F9 by default, you can change it:
    Logger.setPopupTrigger(function(evt){
      if(evt.keyCode === 121)
        return true;
    });
