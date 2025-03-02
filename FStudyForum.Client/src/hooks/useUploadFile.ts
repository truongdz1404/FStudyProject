import {
  StorageError,
  StorageReference,
  uploadBytesResumable,
  UploadMetadata,
  UploadResult,
  UploadTaskSnapshot
} from "firebase/storage";
import { useCallback, useState } from "react";

export type UploadFileHook = [
  (
    storageRef: StorageReference,
    data: Blob | Uint8Array | ArrayBuffer,
    metadata?: UploadMetadata | undefined
  ) => Promise<UploadResult | undefined>,
  boolean,
  UploadTaskSnapshot | undefined,
  StorageError | undefined
];

export default (): UploadFileHook => {
  const [error, setError] = useState<StorageError>();
  const [uploading, setUploading] = useState<boolean>(false);
  const [snapshot, setSnapshot] = useState<UploadTaskSnapshot>();

  const uploadFile = useCallback(
    async (
      storageRef: StorageReference,
      data: Blob | Uint8Array | ArrayBuffer,
      metadata?: UploadMetadata | undefined
    ): Promise<UploadResult | undefined> => {
      return new Promise(resolve => {
        setUploading(true);
        setError(undefined);
        const uploadTask = uploadBytesResumable(storageRef, data, metadata);
        uploadTask.on(
          "state_changed",
          snapshot => {
            setSnapshot(snapshot);
          },
          error => {
            setUploading(false);
            setError(error);
            resolve(undefined);
          },
          () => {
            setUploading(false);
            setSnapshot(undefined);
            resolve({
              metadata: uploadTask.snapshot.metadata,
              ref: uploadTask.snapshot.ref
            });
          }
        );
      });
    },
    []
  );

  return [uploadFile, uploading, snapshot, error];
};
