import { useEffect, useRef } from "react";

const useDownload = (data: any) => {
  const downloadRef = useRef<HTMLAnchorElement | null>();

  useEffect(() => {
    const a = document.createElement("a");

    a.download = "map.json";
    const dataBlob = new Blob([JSON.stringify(data)], { type: "json" });
    a.href = window.URL.createObjectURL(dataBlob);

    document.body.appendChild(a);
    downloadRef.current = a;

    return () => {
      downloadRef.current = null;
      document.body.removeChild(a);
    };
  }, [data]);

  const handleDownload = () => {
    if (downloadRef.current) {
      downloadRef.current.click();
    }
  };

  return handleDownload;
};

export default useDownload;
