import React, { useEffect } from "react";
import useStore from "../Store/store";

export default function Shop() {
  const { setPageTitle } = useStore((state) => state);
  useEffect(() => {
    setPageTitle("Shop");
  }, []);
  return <>Shop</>;
}
