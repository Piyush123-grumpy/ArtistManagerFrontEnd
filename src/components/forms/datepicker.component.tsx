// DateTimePicker.js

import { ErrorMessage } from "@hookform/error-message";
import { Controller } from 'react-hook-form';

const DateTimePicker = ({ control, name, label ,errors}) => {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={{
          required: 'Date is required',
        }}
        render={({ field }) => (
          <input
          className='"w-full text-white px-3 bg-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white-500 focus:border-white-500'
            type="date"
            {...field}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name={name}
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

export default DateTimePicker;
