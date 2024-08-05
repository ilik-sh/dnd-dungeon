import React from 'react'

type Props = {}

export default function drop-box.comp({}: Props) {
  return (
    <DropBox
        id={id}
        onDrop={(e) => {
          e.preventDefault();
          console.log('change');
        }}
      >
        <TextBox>
          <Typography variant="body1" fontWeight={600}>
            Bring your dungeon here
          </Typography>
          <Typography variant="body2">Import JSON file that contains map information</Typography>
        </TextBox>

        <StyledButton variant="contained" fullWidth>
          <label htmlFor={uploadId}>
            Choose file from computer
            <StyledInput type="file" id={uploadId}></StyledInput>
          </label>
        </StyledButton>
      </DropBox>
  )
}