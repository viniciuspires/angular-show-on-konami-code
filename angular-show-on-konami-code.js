angular.module('show-on-konami-code', [])
  .directive('showOnKonamiCode', function(){
  return {
    restrict:'E',
    link:function(scope, element){
      var equals = function (array1, array) {
        if (!array || !array1) return false;
        if (array1.length != array.length) return false;
        for (var i = 0, l=array1.length; i < l; i++) {
          if (array1[i] instanceof Array && array[i] instanceof Array) {
            if (!array1[i].equals(array[i])) return false;
          } else if (array1[i] != array[i]) {
            return false;
          }
        }       
        return true;
      };

      var _show = function(){
        element[0].style.transform='translate(0, 0)';
        element[0].style.transition='transform 200ms ease';
      };

      var _hide = function(){
        element[0].style.position='fixed';
        element[0].style.bottom=0;
        element[0].style.right=0;
        element[0].style.transform='translate(100%, 100%)';
        element[0].style.transition='transform 200ms ease';
      };

      var buffer = [];
      var konamiCode = [32,65,66,39,37,39,37,40,40,38,38];

      _hide();

      document.addEventListener('keydown', function(e){
        buffer.unshift(e.keyCode);
        buffer = buffer.slice(0, 11);

        if (equals(konamiCode,buffer)) {
          console.debug('KONAMI CODE');
          _show();
          setTimeout(function(){
            _hide();
          },1000);
        }
      }, false);
    }
  };
});
