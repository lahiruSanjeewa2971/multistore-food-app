"use client";

import { storage } from "@/firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PuffLoader } from "react-spinners";
import { Button } from "@/components/ui/button";

interface ImagesUploadProps {
  disabled?: boolean;
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImagesUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImagesUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = Array.from(e.target.files || []);
    setIsLoading(true);
    // Array to store newly uploaded urls
    let newUrls: string[] = [];
    // counter to keep track the uploaded images
    let completedUploads = 0;

    files.forEach((file: File) => {
      const uploadTask = uploadBytesResumable(
        ref(storage, `Images/Products/${Date.now()} - ${file.name}`),
        file,
        { contentType: file.type }
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadurl) => {
            // store the newly uploaded url
            newUrls.push(downloadurl);
            // increment the completed uploads
            completedUploads++;
            // combine all the new urls with the existing urls
            onChange([...value, ...newUrls]);
          });
        }
      );
    });
  };

  const onDelete = async (url: string) => {
    const newValue = value.filter((imageUrl) => imageUrl !== url);
    onRemove(url);
    onChange(newValue);
    deleteObject(ref(storage, url)).then(() => {
      toast.success("Image removed.");
    });
  };

  return (
    <div>
      {value && value.length > 0 ? (
        <>
          <div className="flex mb-4 items-center gap-4">
            {value.map((url) => (
              <div
                className="relative w-52 h-52 rounded-md overflow-hidden"
                key={url}
              >
                <Image
                  fill
                  className="object-cover"
                  alt="Billboard image"
                  src={url}
                />
                <div className="absolute z-10 top-2 right-2">
                  <Button
                    type="button"
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => onDelete(url)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center flex-col gap-3 w-52 h-52 rounded-md overflow-hidden border border-dashed border-gray-200">
          {isLoading ? (
            <>
              <PuffLoader size={30} color="#555" />
              <p>{`${progress.toFixed(2)}%`}</p>
            </>
          ) : (
            <>
              <label>
                <div className="flex flex-col gap-2 items-center justify-center w-full h-full cursor-pointer">
                  <ImagePlus className="h-4 w-4" />
                  <p>Upload images</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="w-0 h-0"
                  onChange={onUpload}
                  multiple
                />
              </label>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImagesUpload;
