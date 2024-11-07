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
import { DragEventHandler, DragEvent } from "react";
interface UploadFormProps {
  control: Control<Data>;
  errors: FieldErrors<Data>;
  documentFields: FieldArrayWithId<Data, "documents", "id">[];
  removeDocument: (index: number) => void;
  handleDragOver: (event: DragEvent<HTMLElement>) => void;
  handleDrop: DragEventHandler<HTMLLabelElement>;
  appendDocument: UseFieldArrayAppend<Data, "documents">;
}

const UploadForm: React.FC<UploadFormProps> = ({
  control,
  errors,
  documentFields,
  removeDocument,
  handleDragOver,
  handleDrop,
  appendDocument,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    "https://static.thenounproject.com/png/49665-200.png"
  );

  // State to store URLs of uploaded documents
  const [documentUrls, setDocumentUrls] = useState<string[]>([]);

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileUrl = URL.createObjectURL(file);

      // Update document URLs state
      setDocumentUrls((prevUrls) => [...prevUrls, fileUrl]);

      // Cleanup function to revoke the URL
      return () => {
        URL.revokeObjectURL(fileUrl);
      };
    }
  };

  // Clean up URLs when component unmounts or documentUrls change
  useEffect(() => {
    return () => {
      documentUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [documentUrls]);

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
                field.onChange(event);
                setSelectedImage(
                  event.target.files && event.target.files[0]
                    ? URL.createObjectURL(event.target.files[0])
                    : null
                );
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
                    onChange={(event) => {
                      handleFileChange(event);
                      field.onChange(event); // Integrate with react-hook-form
                    }}
                    // Prevent setting the value programmatically
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

      {/* Display the URLs of uploaded documents */}
      {documentUrls.length > 0 && (
        <div className="document-list">
          <h3>Uploaded Documents:</h3>
          <ul>
            {documentUrls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Document {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
