import { Close, UploadFile, UploadOutlined } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import { upload } from "@testing-library/user-event/dist/upload";
import {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
  useId,
} from "react";
import { s } from "vite/dist/node/types.d-FdqQ54oU";

export type UploadProps = {
  onUpload: (data: unknown) => void;
  className?: string;
  children: React.ReactNode;
  overlay?: boolean;
  disabled?: boolean;
};

export type UploadRef = {
  upload: () => void;
  abort: () => void;
};

export const Upload = forwardRef<UploadRef, UploadProps>(
  ({ onUpload, disabled, overlay = true, children, className }, ref) => {
    const [progress, setProgress] = useState(0);
    const [drop, setDrop] = useState(false);
    const [loading, setLoading] = useState(false);

    const abortUploading = useRef<() => void>();

    const abort = () => {
      abortUploading.current?.();
      reset();
    };

    const reset = () => {
      setLoading(false);
      setProgress(0);
    };

    const handleFile = (file: File) => {
      if (loading || !file) return;

      setLoading(true);
      const uploading = upload<T>(file, url, { onProgress: setProgress });
      abortUploading.current = uploading.abort;
      uploading
        .then(onUpload)
        .catch((e) => {})
        .finally(reset);
    };

    const onDragLeave = (e: React.DragEvent<HTMLElement>) => {
      if (disabled) return;
      e.preventDefault();
      setDrop(false);
    };

    const onDragOver = (e: React.DragEvent<HTMLElement>) => {
      if (disabled) return;
      e.preventDefault();
      setDrop(true);
    };

    const handleDrop = (e: React.DragEvent<HTMLElement>) => {
      if (disabled) return;
      e.preventDefault();
      const droppedFile = e.dataTransfer.files[0];
      setDrop(false);

      handleFile(droppedFile);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      handleFile(event.target.files[0]!);
    };

    const input = useRef<HTMLInputElement>();

    useImperativeHandle(ref, () => ({
      upload: () => input.current?.click(),
      abort,
    }));

    const id = useId();
    return (
      <div
        className={cn(s.root, className)}
        onDrop={handleDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
      >
        {children}

        <label htmlFor={id}>
          <input
            ref={input}
            disabled={disabled}
            type="file"
            onChange={handleFileChange}
            id={id}
          />
          <UploadFile />
        </label>
        {loading && (
          <div>
            <CircularProgress value={progress} />
            <IconButton onClick={abort}>
              <Close />
            </IconButton>
          </div>
        )}
      </div>
    );
  }
);

Upload.displayName = "Upload";
