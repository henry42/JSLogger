/*
  Console for Javascript

  version 1.0

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
*/
(function( w , d ){
    if( d.addEventListener )
        d.addEventListener('keydown',onKeyDown , false);
    else if(d.attachEvent )
        d.attachEvent('onkeydown' , onKeyDown);

    var _div , _logs = [] , isOpened = false , times = {} , popupTrigger;
    var _console = {
        _LOGS : _logs,
        CLIENT_TIME : new Date().getTime(),
        time : function( label ){
            times[ label ] = new Date().getTime();
            return this;
        },
        timeEnd : function( label ){
            return this.log( label , ':' , new Date().getTime() - times[label] || 0 , 'ms');
        },
        setPopupTrigger : function( trigger ){
            popupTrigger = trigger;
        },
        version : '1.0'
    };


    for(var _t = ['info','error','debug','log','warn'] , i = 0 , _type ; _type = _t[i] ; i++ ){
        (function( _type ){
            _console[ _type ] = function(){
                _logs.push('<b>[' + _type.toUpperCase() + ']</b>&nbsp;'  + Array.prototype.slice.call(arguments).join(' ').replace(/&/g,'&amp;').replace(/</g,'&lt;') );
                if( isOpened )
                    refreshDiv();
                return this;
            }
        })( _type );
    }

    function onKeyDown( evt ){
        evt = evt || event;
        if( evt ){
          if( popupTrigger && popupTrigger(evt) === true
            ||  !popupTrigger && evt.keyCode === 120 && evt.altKey && evt.ctrlKey)
              toggleDiv();
        }
    }

    function toggleDiv(){
        isOpened = !isOpened;
        if( isOpened )
            showDiv();
        else
            hideDiv();
        if( isOpened )
            refreshDiv();
    }

    function refreshDiv(){
        var div = getDiv();
        getDiv().innerHTML = _logs.join('<br>');
        div.scrollTop = div.scrollHeight;
    }

    var isIE6 = !window.XMLHttpRequest, _style = _console.style = (isIE6 ? 'position:absolute;height:250px;' : 'position:fixed;height:50%;' ) + ';display:none;top:0;right:0;width:50%;padding:5px;color:#fff;margin:5px;font-weight:500;z-index:100000;overflow:auto;background-color:rgba(0,0,0,0.7);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#99000000", endColorstr="#99000000", GradientType=0);';

    function getDiv(){
        if( _div )
            return _div;
        _div = document.createElement('div');
        _div.className = 'x-class-logger';


        try{
            _div.style.cssText = _style;
        }catch(e){}

        document.body.appendChild( _div );

        return _div;
    }

    function showDiv(){
        getDiv().style.display = 'block';
    }

    function hideDiv(){
        getDiv().style.display = 'none';
    }


    w.Logger = _console;

    _console.info('[UA]' , navigator.userAgent );

})( window , document );
