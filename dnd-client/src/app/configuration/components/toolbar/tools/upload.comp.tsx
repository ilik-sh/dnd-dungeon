import { Button, styled } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import React, { useId } from "react";

type UploadProps = {
  onUpload: (data: unknown) => void;
};

const StyledInput = styled("input")({
  display: "none",
  alignItems: "center",
});

const readJsonFile = (file: Blob) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      if (event.target) {
        resolve(JSON.parse(event.target.result as string));
      }
    };

    fileReader.onerror = (error) => reject(error);
    fileReader.readAsText(file);
  });

export default function Upload({ onUpload }: UploadProps) {
  const id = useId();

  const handleFile = (data?: unknown) => {
    if (!data) return;

    try {
      onUpload(data);
    } catch (e) {
      enqueueSnackbar("Error uploading", { variant: "error" });
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      return;
    }
    const parsedData = await readJsonFile(event.target.files[0]);
    handleFile(parsedData);
  };

  return (
    <Button>
      <label htmlFor={id}>
        <StyledInput type="file" id={id} onChange={handleFileChange} />
        Upload
      </label>
    </Button>
  );
}
