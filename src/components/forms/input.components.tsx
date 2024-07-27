import { ChangeEvent, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
type InputComponentProps = {
  icon?: string;
  id: string;
  messageRef?: any | undefined;
  label?: string;
  value?: string;
  name?: string;
  type?: string;
  min?: string;
  max?: string;
  step?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  validation?: object;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  outerboxclass?: string;
  labelclass?: string;
  hideArrow?: boolean;
  iconclass?: string;
  classes?: string;
  autoComplete?: string;
  placeholder?: string;
  labelPositionTop?: boolean; // Custom tailwind classes
  onClick?: () => void;
  readOnly?: boolean;
  isFromSalesTarget?: boolean;
};

const InputComponent = ({
  id,
  label,
  isFromSalesTarget,
  messageRef = undefined,
  type = "text",
  required = false,
  disabled = false,
  register,
  step,
  validation,
  min,
  max,
  icon,
  hideArrow = true,
  placeholder,
  errors,
  onChange,
  classes,
  // value,
  outerboxclass,
  labelclass,
  iconclass,
  autoComplete,
  readOnly = false,
}: InputComponentProps) => {
  //name on the prop has been remvoed for now
  const [visible, setVisible] = useState(false);

  !isFromSalesTarget
    ? (validation = {
      validate: (value: string) => {
        if (value == "") {
          return true;
        } else {
          if (value !== null) {
            
            return !!String(value).trim() || "Value can not be whitespace";
          }
        }
        // return !!value.trim() || "Value can not be whitespace";
      },
      ...validation,
    })
    : null;

  let onchange = onChange;

  if (!onchange) {
    const { onChange } = register(id, validation);
    onchange = onChange;
  }
  const { ref, onBlur, name } = register(id, validation);

  return (
    <div className={`flex flex-col mb-2 px-0 relative ${outerboxclass}`}>
      {label && (
        <label
          htmlFor={id}
          className={`my-2 text-[10px] leading-none text-gray-500  block mb-2 text-sm ml-2 ${labelclass}`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          required={required}
          id={id}
          type={type === "password" && visible ? "text" : type}
          // value={value!==''?value:''}
          disabled={disabled}
          className={`${hideArrow ? "" : "disablednum"
            } relative py-3 text-sm text-black bg-white transition duration-200 space-x-2 border border-[#cecece] rounded-md   ${icon ? "pl-12" : "pl-4"
            } focus:outline-none w-full focus:border-primary focus:ring-0 focus:shadow-none focus:text-gray-950  ${errors && errors[id] && "border border-red-500"
            } ${classes ?? ""}`}
          // {...register(id, validation)}
          ref={messageRef !== undefined ? messageRef : ref}
          name={name}
          onWheel={e => e.target.blur()}
          min={min ? min : ""}
          max={max ? max : ""}
          step={step ? step : ""}
          onBlur={onBlur}

          onChange={onchange}
          placeholder={placeholder}
          // onClick={onClick}
          autoComplete={autoComplete !== "" ? autoComplete : ""}
          readOnly={readOnly}
        />
        {icon && (
          <i
            className={`absolute  inset-0 top-[10px] left-0 mx-4 text-gray-500 w-[20px] h-[20px] text-lg ${icon} ${iconclass}`}
          ></i>
        )}

        {type === "password" && (
          <span
            onClick={() => {
              setVisible(!visible);
            }}
            className="pr-2 text-gray-400 cursor-pointer absolute inset-0 top-[8px] left-[320px] mx-4 text-gray-600 w-[20px] h-[20px] "
          >
            <i
              className={`${iconclass} ${visible ? "fa fa-eye text-secondary" : "fa fa-eye-slash"
                }`}
            ></i>
          </span>
        )}
      </div>
      {/* {error && (
        <div className="order-3 mt-1 bg-red-100 pl-2">
          <small className="text-red-700 font-xs">{error}</small>
        </div>
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
    </div>
  );
};

export default InputComponent;
