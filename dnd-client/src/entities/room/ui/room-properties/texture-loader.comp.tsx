import React, { useState } from 'react';
import { Control, useController } from 'react-hook-form';

import { Button, CircularProgress } from '@mui/material';
import { Box, styled } from '@mui/material';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable, UploadTask } from 'firebase/storage';
import { enqueueSnackbar } from 'notistack';

import CircularProgressWithLabel from 'shared/ui/circular-progress.comp';

import { RoomFormYup } from '../../model/validation-schemas/room-form.schema';

type RoomTextureLoaderProps = {
  control: Control<RoomFormYup, any>;
  submit?: React.FormEventHandler;
};

const ImageBox = styled(Box)(({ theme }) => ({
  width: '92px',
  height: '92px',
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FullWidthHeightButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '100%',
}));

export default function RoomTextureLoader({ control, submit }: RoomTextureLoaderProps) {
  const { field } = useController({
    control,
    name: 'textureUrl',
  });
  const [progress, setProgress] = useState(0);
  const [upload, setUpload] = useState(false);

  const textureUrl = field.value;
  const id = control._defaultValues.id;

  const storage = getStorage();
  const textureRef = ref(storage, `textures/${id}`);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length > 1) {
      return;
    }
    const file = event.target.files[0];
    setUpload(true);
    const uploadTask = uploadBytesResumable(textureRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        enqueueSnackbar('Succesfully uploaded texture', { variant: 'error' });
        setUpload(false);
      },
      () => {
        setUpload(false);
        enqueueSnackbar('Succesfully uploaded texture', { variant: 'success' });
        getDownloadURL(textureRef).then((url) => {
          field.onChange(url);
          if (submit) {
            submit();
          }
        });
      },
    );
  };
  return (
    <ImageBox
      sx={{
        backgroundImage: textureUrl ? `url(${textureUrl})` : '',
        backgroundSize: 'cover',
      }}
    >
      <FullWidthHeightButton variant="outlined" component="label">
        {upload ? <CircularProgress variant="determinate" value={progress} /> : null}
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </FullWidthHeightButton>
    </ImageBox>
  );
}
