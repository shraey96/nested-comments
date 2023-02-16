import { useRef, useEffect } from "react";

const useEventListener = ({
  ref,
  eventName,
  options = {},
  callback = () => {},
}) => {
  const handler = useRef();

  useEffect(() => {
    handler.current = callback;
  }, [callback]);

  useEffect(() => {
    function runHandler() {
      handler.current();
    }

    const elementToAttacheventListenerTo = ref?.current || ref || window;

    elementToAttacheventListenerTo.addEventListener(
      eventName,
      runHandler,
      options
    );

    return () =>
      elementToAttacheventListenerTo.removeEventListener(
        eventName,
        runHandler,
        options
      );
  }, [eventName, options, ref]);
};

export default useEventListener;
