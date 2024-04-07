import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { manualGenerationFormSchema } from "../../validation-schemas/manual-generation-form.schema";
import ConfigureMap from "./configure-map.comp";
import Sidebar from "../sidebar/sidebar.comp";

import { useAppSelector } from "hooks/redux.hooks";
import { mapSelector } from "app/map/store/map.selector";

import ThreeHex from "components/3d-hex/3d-hex.comp";
import Toolbar from "../toolbar/toolbar.comp";

type Props = {};

export default function ManualGenerationTab({}: Props) {
  const { multipleSelection } = useAppSelector(mapSelector);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(manualGenerationFormSchema),
  });

  const onSubmit = () => {};
  return (
    <>
      <Toolbar />
      <ConfigureMap />
      <div style={{ width: "80%", height: "800px" }}>
        <ThreeHex />
      </div>
      <Sidebar />
    </>
  );
}
