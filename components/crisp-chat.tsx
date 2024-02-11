"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("7321cfdc-63c3-4e5c-aa5f-a08b897f91db");
  }, []);

  return null;
};
