import { FC, Suspense } from "react";

type Props = {
  element: any;
};

export default function Suspend({ element: Element }: Props) {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
}
