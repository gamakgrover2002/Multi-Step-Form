import React from "react";
import {
  Controller,
  Control,
  FieldErrors,
  FieldArrayWithId,
  UseFormHandleSubmit,
} from "react-hook-form";
import { Input } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Data } from "../model/Data";

interface FamilyFormProps {
  control: Control<Data> | undefined;
  errors: FieldErrors<Data>;
  fields: FieldArrayWithId<Data, "family", "id">[];
  remove: (index: number) => void;
  append: (value: { name: string; age: string; contact: string }) => void;
  onSubmit: (data: Data) => void;
  handleSubmit: UseFormHandleSubmit<Data, undefined>;
  readonly?: boolean;
}

const FamilyForm: React.FC<FamilyFormProps> = ({
  control,
  errors,
  fields,
  remove,
  append,
  onSubmit,
  handleSubmit,
  readonly,
}) => {
  return (
    <div className="step step-2">
      {fields.map((item, index) => (
        <div key={item.id}>
          <Controller
            name={`family.${index}.name`}
            rules={{ required: "Name is required" }}
            control={control}
            render={({ field }) => (
              <>
                <Input
                  className={`form-input ${
                    errors.family?.[index]?.name ? "error" : ""
                  }`}
                  type="text"
                  placeholder="Family Name"
                  {...field}
                  readOnly={readonly}
                />
                {errors.family?.[index]?.name && (
                  <p className="error-message">
                    {errors.family[index].name.message}
                  </p>
                )}
              </>
            )}
          />
          <Controller
            name={`family.${index}.age`}
            rules={{
              required: "Age is required",
              min: {
                value: 0,
                message: "Age cannot be negative",
              },
              max: {
                value: 100,
                message: "Age cannot be more than 100",
              },
            }}
            control={control}
            render={({ field }) => (
              <>
                <Input
                  className={`form-input ${
                    errors.family?.[index]?.age ? "error" : ""
                  }`}
                  type="number"
                  placeholder="Family Age"
                  {...field}
                  readOnly={readonly}
                />
                {errors.family?.[index]?.age && (
                  <p className="error-message">
                    {errors.family[index].age.message}
                  </p>
                )}
              </>
            )}
          />
          <Controller
            name={`family.${index}.contact`}
            rules={{
              required: "Contact is required",
              minLength: {
                value: 10,
                message: "Contact must be 10 digits",
              },
              maxLength: {
                value: 10,
                message: "Contact must be 10 digits",
              },
            }}
            control={control}
            render={({ field }) => (
              <>
                <Input
                  className={`form-input ${
                    errors.family?.[index]?.contact ? "error" : ""
                  }`}
                  type="text"
                  placeholder="Family Contact"
                  {...field}
                  readOnly={readonly}
                />
                {errors.family?.[index]?.contact && (
                  <p className="error-message">
                    {errors.family[index].contact.message}
                  </p>
                )}
              </>
            )}
          />

          <DeleteIcon
            className="form-button remove-button"
            onClick={() => {
              if (fields.length > 1) {
                remove(index);
              } else {
                alert("Can't remove the last field. Must fill at least one.");
              }
            }}
          />
        </div>
      ))}

      <button
        type="button"
        className="form-button add-button"
        onClick={() => {
          handleSubmit((data: Data) => {
            onSubmit(data);
            append({ name: "", age: "", contact: "" });
          })();
        }}
      >
        Add
      </button>
    </div>
  );
};

export default FamilyForm;
