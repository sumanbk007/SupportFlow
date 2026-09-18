// import { useState, useEffect, useCallback, useRef } from "react";
// import styles from "./carousel.module.scss";
// import { CarouselProps } from "./carousel.types";

// const Carousel = ({ slides, autoPlayInterval = 4000 }: CarouselProps) => {
//   const [current, setCurrent] = useState(0);
//   const prevRef = useRef<number | null>(null);

//   const next = useCallback(() => {
//     setCurrent((prev) => {
//       prevRef.current = prev;
//       return (prev + 1) % slides.length;
//     });
//   }, [slides.length]);

//   const goTo = (index: number) => {
//     prevRef.current = current;
//     setCurrent(index);
//   };

//   useEffect(() => {
//     const timer = setInterval(next, autoPlayInterval);
//     return () => clearInterval(timer);
//   }, [next, autoPlayInterval]);

//   const getSlideClass = (index: number) => {
//     if (index === current) return `${styles.slide} ${styles.slideActive}`;
//     if (index === prevRef.current) return `${styles.slide} ${styles.slidePrev}`;
//     return styles.slide;
//   };

//   return (
//     <div className={styles.root}>
//       <div className={styles.slideWrapper}>
//         {slides.map((slide, index) => (
//           <div key={slide.id} className={getSlideClass(index)}>
//             <div className={styles.imageWrapper}>
//               <img
//                 src={slide.image}
//                 alt={slide.title}
//                 className={styles.image}
//               />
//             </div>
//             <div className={styles.content}>
//               <h2 className={styles.title}>{slide.title}</h2>
//               <p className={styles.description}>{slide.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className={styles.dots}>
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             className={`${styles.dot} ${index === current ? styles.dotActive : ""}`}
//             onClick={() => goTo(index)}
//             aria-label={`Go to slide ${index + 1}`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export { Carousel };

import { useState, useEffect, useCallback } from "react";
import styles from "./carousel.module.scss";
import type { CarouselProps } from "./carousel.types";

const Carousel = ({ slides, autoPlayInterval = 3000 }: CarouselProps) => {
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

  const [current, setCurrent] = useState(1);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const next = useCallback(() => {
    setCurrent((prev) => prev + 1);
  }, []);

  const goTo = (index: number) => {
    setTransitionEnabled(true);
    setCurrent(index + 1);
  };

  useEffect(() => {
    const timer = setInterval(next, autoPlayInterval);

    return () => clearInterval(timer);
  }, [next, autoPlayInterval]);

  const handleTransitionEnd = () => {
    if (current === slides.length + 1) {
      setTransitionEnabled(false);
      setCurrent(1);
    }

    if (current === 0) {
      setTransitionEnabled(false);
      setCurrent(slides.length);
    }
  };

  useEffect(() => {
    if (!transitionEnabled) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }
  }, [transitionEnabled]);

  const activeDot = (current - 1 + slides.length) % slides.length;

  return (
    <div className={styles.root}>
      <div className={styles.viewport}>
        <div
          className={styles.track}
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: transitionEnabled
              ? "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)"
              : "none",
          }}
        >
          {extendedSlides.map((slide, index) => (
            // <div key={`${slide.id}-${index}`} className={styles.slide}>
            //   <div className={styles.imageWrapper}>
            //     <img
            //       src={slide.image}
            //       alt={slide.title}
            //       className={styles.image}
            //     />
            //   </div>

            //   <div className={styles.content}>
            //     <h2 className={styles.title}>{slide.title}</h2>

            //     <p className={styles.description}>{slide.description}</p>
            //   </div>
            // </div>

            <div key={`${slide.id}-${index}`} className={styles.slide}>
              <div className={styles.imageFrame}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={styles.image}
                />
              </div>

              <div className={styles.content}>
                <h2 className={styles.title}>{slide.title}</h2>
                <p className={styles.description}>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === activeDot ? styles.dotActive : ""
            }`}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export { Carousel };
