import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

const LAPTOP_BREAKPOINT = 1200;

export function useLaptop() {
  const [isLaptop, setIsLaptop] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${LAPTOP_BREAKPOINT}px)`);
    const onChange = () => {
      setIsLaptop(window.innerWidth < LAPTOP_BREAKPOINT);
    };

    mql.addEventListener("change", onChange);
    setIsLaptop(window.innerWidth < LAPTOP_BREAKPOINT);

    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isLaptop;
}