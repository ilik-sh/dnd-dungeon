import { VerticalContainer } from 'components/vertical-container.comp';
import Header from './components/header/header.comp';
import ManualGenerationTab from './components/manual-generation-tab/manual-generation-tab.comp';

export default function ConfigurationPage() {
  return (
    <>
      <Header />
      <VerticalContainer>
        <ManualGenerationTab />
      </VerticalContainer>
    </>
  );
}
