$(document).ready(function(){
  // Detectar si es dispositivo móvil
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  // Ajustar la escala inicial en móviles
  function adjustScale() {
      const windowWidth = $(window).width();
      const card = $('#card');
      
      if (!card.hasClass('fullscreen-mode')) {
          if(windowWidth <= 768) {
              card.css({
                  'transform-origin': 'center center',
                  'transform': 'scale(0.9)'
              });
          }
          if(windowWidth <= 480) {
              card.css('transform', 'scale(0.8)');
          }
      } else {
          card.css('transform', 'none');
      }
  }

  // Llamar a adjustScale cuando la página carga y cuando se redimensiona
  adjustScale();
  $(window).resize(adjustScale);

  $('.valentines-day').on('click touchstart', function(e){
      e.preventDefault(); // Prevenir comportamiento por defecto en móviles
      
      // Animación de desvanecimiento de los elementos del sobre
      $('.envelope').css({
          'animation': 'fall 3s linear 1',
          '-webkit-animation': 'fall 3s linear 1'
      });
      
      $('.envelope').fadeOut(800, function() {
          // Ocultar elementos dentro de .valentines-day
          $('.valentines-day .heart, .valentines-day .text, .valentines-day .front').hide();
          
          // Hacer visible la carta con una animación ondulante
          $('#card').css({
              'visibility': 'visible',
              'opacity': 0,
              'transform': 'scale(0.1)'
          });
          
          $('#card').animate({'opacity': 1}, {
              duration: 1000,
              step: function(now, fx) {
                  const scale = isMobile ? 
                      (0.8 + Math.sin(now * Math.PI) * 0.1) : 
                      (1 + Math.sin(now * Math.PI) * 0.1);
                  $(this).css('transform', 'scale(' + scale + ')');
              }
          });
      });
  });

  $('.title').click(function(){
      $('.container').addClass('open');
      
      var duration = 3 * 1000;
      var animationEnd = Date.now() + duration;
      var defaults = { 
          startVelocity: 30, 
          spread: 360, 
          ticks: 60, 
          zIndex: 0 
      };

      function randomInRange(min, max) {
          return Math.random() * (max - min) + min;
      }

      var interval = setInterval(function() {
          var timeLeft = animationEnd - Date.now();
          
          if (timeLeft <= 0) {
              return clearInterval(interval);
          }

          var particleCount = 50 * (timeLeft / duration);
          
          // Confetti a la izquierda
          confetti(Object.assign({}, defaults, {
              particleCount,
              origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
          }));
          
          // Confetti a la derecha
          confetti(Object.assign({}, defaults, {
              particleCount,
              origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
          }));
      }, 250);
  });

  $('.close').click(function(){
      $('.container').removeClass('open');
  });

  // Nueva función para el botón de la carta
  $('.carta-btn').click(function(){
      window.location.href = '../htm/index.htm'; // Cambiado a index.htm
  });

  // Función para manejar pantalla completa
  $('#fullscreenBtn').click(function() {
      const card = $('#card');
      const icon = $(this).find('i');
      
      if (!card.hasClass('fullscreen-mode')) {
          // Entrar en modo pantalla completa
          card.addClass('fullscreen-mode');
          icon.removeClass('fa-search-plus').addClass('fa-search-minus');
          
          // Cambiar la fuente a Arial
          card.css('font-family', 'Arial, sans-serif');
          
          // Ajustar scroll
          $('body').css('overflow', 'hidden');
          card.css('visibility', 'visible');
          
      } else {
          // Salir de modo pantalla completa
          card.removeClass('fullscreen-mode');
          icon.removeClass('fa-search-minus').addClass('fa-search-plus');
          
          // Restaurar la fuente original
          card.css('font-family', "'Sacramento', cursive");
          
          // Restaurar scroll
          $('body').css('overflow', '');
      }
      
      // Reajustar escala después de cambiar modo
      adjustScale();
  });
});
