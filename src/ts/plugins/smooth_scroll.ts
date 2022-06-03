window.addEventListener('load', () => {
  const anchors: HTMLAnchorElement[] = [...document.querySelectorAll('a[href*="#"]')] as HTMLAnchorElement[];
  // let 
  //   animationTime = 100,
  //   framesCount = 20;

  anchors
    .filter(anchor => anchor.href.replace(location.href, '').length > 1)
    .forEach(anchor => {
      anchor.addEventListener('click', e => {
        e.preventDefault();
        
        const id = anchor.href.replace(location.href, '').substring(1);
        document.getElementById(id)?.scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

  // anchors.filter(anchor => anchor.href.length > 1).forEach(anchor => {
  //   anchor.addEventListener('click', e => {
  //     e.preventDefault();
      
  //     const targetTop = document.querySelector(anchor.getAttribute('href')).getBoundingClientRect().top;
  //     let coordY = targetTop + window.pageYOffset;
      
  //     animationTime = Math.abs(targetTop) <= 1000 
  //       ? 100 
  //       : Math.floor(targetTop / 1000) * 100;

  //     animationTime = animationTime > 700 ? 700 : animationTime;

  //     framesCount = Math.abs(targetTop) <= 2000 
  //       ? 20
  //       : Math.floor(targetTop / 1000) * 10;
      
  //     let scroller = setInterval(function() {
  //       let scrollBy = coordY / framesCount;
        
  //       // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
  //       // и дно страницы не достигнуто
  //       if(scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
  //         // то скроллим на к-во пикселей, которое соответствует одному такту
  //         window.scrollBy(0, scrollBy);
  //       } else {
  //         // иначе добираемся до элемента и выходим из интервала
  //         window.scrollTo(0, coordY);
  //         clearInterval(scroller);
  //       }
  //     // время интервала равняется частному от времени анимации и к-ва кадров
  //     }, animationTime / framesCount);
  //   });
  // });
});