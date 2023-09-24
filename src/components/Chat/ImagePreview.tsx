import React, { useState } from "react";
import { Button } from "src/ui/Buttons";

interface ImagePreviewProps extends React.PropsWithChildren {
  src: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ src }) => {
  const [imagePreview, setImagePreview] = useState(true);

  if (imagePreview)
    return (
      <div
        className="h-40 mb-1 c"
        style={{
          backgroundImage:
            "radial-gradient(var(--black) 1px, var(--hover-color) 1px)",
          backgroundSize: "8px 8px",
        }}
      >
        <Button
          btn="outline"
          size="sm"
          onClick={() => setImagePreview(!imagePreview)}
        >
          Load image
        </Button>
      </div>
    );

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} className="min-h-[160px]" alt="image" />;
};
