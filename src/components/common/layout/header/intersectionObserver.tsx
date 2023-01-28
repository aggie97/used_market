import { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { stuckState } from "../../../../commons/store";
const Wrapper = ({ children }: { children: JSX.Element }) => {
  const setStuck = useSetRecoilState(stuckState);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cachedRef = ref.current;
    const observer = new IntersectionObserver(
      ([e]) => setStuck(e.intersectionRatio < 1),
      { threshold: [1], rootMargin: "120px 0px 0px 0px" }
    );

    observer.observe(cachedRef);
    return () => observer.unobserve(cachedRef);
  }, [ref]);
  return (
    <div style={{ textAlign: "center" }} ref={ref}>
      {children}
    </div>
  );
};

export default Wrapper;
