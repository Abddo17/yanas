import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export const use3DTilt = () => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMouseMove = (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      const rotateX = gsap.utils.mapRange(0, height, -10, 10, y);
      const rotateY = gsap.utils.mapRange(0, width, 10, -10, x);
      
      gsap.to(card, {
        duration: 0.7,
        rotateX: rotateX,
        rotateY: rotateY,
        ease: 'power2.out',
      });
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        duration: 1,
        rotateX: 0,
        rotateY: 0,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      card.removeEventListener('mousemove', onMouseMove);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return cardRef;
}; 