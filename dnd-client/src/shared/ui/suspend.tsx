import { Suspense } from 'react';

import CenteredHexProgress from 'shared/ui/centered-hex-progress.comp';

type Props = {
  element: any;
  fallback?: any;
};

export default function Suspend({ element: Element, fallback: Fallback }: Props) {
  return (
    <Suspense fallback={Fallback ? <Fallback /> : <CenteredHexProgress />}>
      <Element />
    </Suspense>
  );
}
