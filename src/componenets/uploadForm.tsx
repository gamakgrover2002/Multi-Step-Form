import React, { useState, useEffect } from "react";
import {
  Controller,
  Control,
  FieldErrors,
  FieldArrayWithId,
  UseFieldArrayAppend,
} from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import { Data } from "../model/Data";

interface UploadFormProps {
  control: Control<Data>;
  errors: FieldErrors<Data>;
  documentFields: FieldArrayWithId<Data, "documents", "id">[];
  removeDocument: (index: number) => void;
  handleDragOver: (event: React.DragEvent<HTMLElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLLabelElement>) => void;
  appendDocument: UseFieldArrayAppend<Data, "documents">;
}

const UploadForm: React.FC<UploadFormProps> = ({
  control,
  errors,
  documentFields,
  removeDocument,
  handleDragOver,
  handleDrop,
  appendDocument, // Added to props
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    "https://static.thenounproject.com/png/49665-200.png"
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);

      return () => {
        URL.revokeObjectURL(imageUrl);
      };
    }
  };

  useEffect(() => {
    return () => {
      if (
        selectedImage &&
        selectedImage !== "https://static.thenounproject.com/png/49665-200.png"
      ) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  return (
    <div className="step step-4 upload-input">
      <Controller
        name="image"
        control={control}
        render={({ field }) => (
          <label
            htmlFor="image"
            className="drop-area"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              className="image-input"
              id="image"
              hidden
              onChange={(event) => {
                handleFileChange(event);
                field.onChange(event); // Integrate with react-hook-form
              }}
              ref={field.ref}
            />
            <div id="img-view" className="image-preview">
              {selectedImage && (
                <img src={selectedImage} alt="Selected Preview" />
              )}
              <p>Drag and Drop Image to Upload</p>
            </div>
          </label>
        )}
      />

      {documentFields.length > 0 ? (
        documentFields.map((item, index) => (
          <div key={item.id} className="documents">
            <Controller
              rules={{ required: "Document is required" }}
              name={`documents.${index}.number`}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    className={`form-input ${
                      errors.documents?.[index]?.number ? "error" : ""
                    }`}
                    type="file"
                    {...field}
                  />
                  {errors.documents?.[index]?.number && (
                    <p className="error-message">
                      {errors.documents[index].number.message}
                    </p>
                  )}
                </>
              )}
            />
            <DeleteIcon
              className="form-button remove-button"
              onClick={() => removeDocument(index)}
            />
          </div>
        ))
      ) : (
        <p>No documents available</p>
      )}

      <button
        className="form-button add-button"
        type="button"
        onClick={() => appendDocument({ number: "" })}
      >
        Add Document
      </button>
    </div>
  );
};

export default UploadForm;
