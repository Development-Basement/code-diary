import { useEffect, useLayoutEffect } from "react";

const useCustomEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect; // TODO: check what this is really doing

export default useCustomEffect;
