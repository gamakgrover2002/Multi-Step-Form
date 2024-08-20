import React from "react";
import { Controller, FieldErrors, Control } from "react-hook-form";
import { Data } from "../model/Data";
import Autocomplete from "./AutoComplete";
import Input from "./Input";
interface AddressFormProps {
  control: Control<Data> | undefined;
  errors: FieldErrors<Data>;
  handleAddressSelect: (val: string) => void;
  readonly?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({
  control,

  errors,
  handleAddressSelect,
  readonly,
}) => {
  return (
    <div className="step step-3">
      <Autocomplete readonly={readonly} onSelect={handleAddressSelect} />

      <Controller
        name="city"
        rules={{ required: "City is required" }}
        control={control}
        render={({ field }) => (
          <>
            <Input
              className={`form-input ${errors.city ? "error" : ""}`}
              type="text"
              placeholder="City"
              field={field}
              readOnly={readonly}
            />
            {errors.city && (
              <p className="error-message">{errors.city.message}</p>
            )}
          </>
        )}
      />
      <Controller
        name="state"
        rules={{ required: "State is required" }}
        control={control}
        render={({ field }) => (
          <>
            <Input
              className={`form-input ${errors.state ? "error" : ""}`}
              type="text"
              placeholder="State"
              field={field}
              readOnly={readonly}
            />
            {errors.state && (
              <p className="error-message">{errors.state.message}</p>
            )}
          </>
        )}
      />
      <Controller
        name="country"
        rules={{ required: "Country is required" }}
        control={control}
        render={({ field }) => (
          <>
            <Input
              className={`form-input ${errors.country ? "error" : ""}`}
              type="text"
              placeholder="Country"
              field={field}
              readOnly={readonly}
            />
            {errors.country && (
              <p className="error-message">{errors.country.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default AddressForm;
