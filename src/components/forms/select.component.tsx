import OptionItem from "../../types/option-item.type";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ChangeEvent } from "react";
// import { Select, initTE } from "tw-elements";
// initTE({ Select });

type SelectComponentProps = {
  id: string;
  label?: string;
  defaultlabel?: string;
  value?: string;
  options?: OptionItem[];
  required?: boolean;
  disabled?: boolean;
  validation?: object;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  outerboxclass?: string;
  labelclass?: string;
  classes?: string;
  wrapperclass?: string;
  removeDefaultLabel?: boolean;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const SelectComponent = ({
  id,
  label,
  required = false,
  disabled = false,
  removeDefaultLabel = false,
  register,
  validation,
  defaultlabel = label,
  errors,
  options,
  outerboxclass,
  labelclass,
  classes,
  wrapperclass,
  onChange,
  value,
}: SelectComponentProps) => {
  return (
    <div className={`flex flex-col ${outerboxclass}`}>
      {label && (
        <label
          htmlFor={id}
          className={`my-1 leading-none text-black block ml-2 text-sm ${labelclass}`}
        >
          {label}
        </label>
      )}
      <div className={`relative flex flex-row items-center transition duration-200 space-x-2 rounded-md ${wrapperclass}`}>
        <select
          data-te-select-init
          required={required}
          id={id}
          disabled={disabled}
          className={`px-3 py-3 w-full outline-none shadow-none focus:outline-none focus:ring-0 focus:border-primary text-sm text-black rounded border border-[#c4c4c4] ${classes}`}
          {...register(id, validation)}
          defaultValue={value}
          onChange={onChange}
        >
          {removeDefaultLabel ? null : <option value="">{defaultlabel}</option>}
          {options?.map(({ label, value }, index) => (
            <option key={index} value={value}>
              {label}
            </option>
          ))}
        </select>
        {/* Add the arrow button using a Bootstrap icon */}
        {/* <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <i className={`absolute  inset-0 top-[8px] left-0 mx-4 text-gray-600 w-[20px] h-[20px] mr-10 ${icon} ${iconclass}`}> </i>
          </div> */}
      </div>
      {/* {errors && errors[id] && errors[id].type !== "validate" && (
        <ErrorMessage
          errors={errors}
          name={id}
          render={({ messages }) =>
            messages && (
              <div className="order-3 mt-1 bg-red-100 pl-2">
                {Object.entries(messages).map(([type, message]) => (
                  <small key={type} className="text-red-700 font-xs">
                    {message}
                  </small>
                ))}
              </div>
            )
          }
        />
      )} */}
      <ErrorMessage
        errors={errors}
        name={id}
        render={({ messages, message }) => {

          if (messages !== undefined) {

            return (
              messages &&
              Object.entries(messages).map(([type, message]) => {
                return (
                  <div key={type} className="order-3 mt-1 pl-2">
                    <small className="text-red-700 font-xs">{message}</small>
                  </div>
                );
              })
            );
          } else if (message !== undefined) {
            return (
              <div className="order-3 mt-1 pl-2">
                <small className="text-red-700 font-xs">{message}</small>
              </div>
            );
          }
        }}
      />
      {/* <ErrorMessage
        errors={errors}
        name={id}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <div key={type} className="order-3 mt-1 bg-red-100 pl-2">
              <small className="text-red-700 font-xs">{message}</small>
            </div>
          ))
        }
      /> */}
    </div>
  );
};

export default SelectComponent;