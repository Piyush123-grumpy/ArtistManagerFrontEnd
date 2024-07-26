type ButtonProps = {
    label: string;
    type?: "button" | "submit" | "reset";
    loading?: boolean;
    onClick?: () => void;
    classes?: string;
    buttontext?: string;
    disabled?: boolean;
  };
  
  const ButtonComponent = ({
    onClick,
    label,
    type = "button",
    loading,
    classes,
    buttontext,
    disabled,
  }: ButtonProps) => {
    return (
      <button
        disabled={disabled || loading} 
        type={type}
        onClick={onClick}
        className={`bg-primary px-2 py-2 text-white rounded-lg uppercase flex flex-row space-x-2 ${classes}`}
      >
        {loading && (
          <span>
            <i className="fa fa-spinner animate-spin" />
          </span>
        )}
        <span className={`${buttontext}`}>{label}</span>
      </button>
    );
  };
  
  export default ButtonComponent;