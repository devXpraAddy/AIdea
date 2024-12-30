import Image from "next/image";
import { MotionWrapper } from "@/components/animations/motion-wrapper";

export const Loader = () => {
  return (
    <MotionWrapper
      variant="fade"
      className="h-full flex flex-col gap-y-4 items-center justify-center"
    >
      <div className="w-10 h-10 relative animate-spin">
        <Image alt="logo" fill src="/logo.png" />
      </div>
      <p className="text-sm text-muted-foreground">AIris is thinking...</p>
    </MotionWrapper>
  );
};
