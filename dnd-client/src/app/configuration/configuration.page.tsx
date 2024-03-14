import { VerticalContainer } from "components/vertical-container.comp";
import ConfigurationTabs from "./components/configuration-tabs.comp";

type Props = {};

export default function ConfigurationPage({}: Props) {
  return (
    <VerticalContainer>
      <ConfigurationTabs />
    </VerticalContainer>
  );
}
