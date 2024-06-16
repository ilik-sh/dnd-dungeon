import CenteredCircularProgress from 'components/centered-hex-progress.comp';
import { Suspense } from 'react';

type Props = {
  element: any;
  fallback?: any;
};

export default function Suspend({ element: Element, fallback: Fallback }: Props) {
  return (
    <Suspense fallback={Fallback ? <Fallback /> : <CenteredCircularProgress />}>
      <Element />
    </Suspense>
  );
}
