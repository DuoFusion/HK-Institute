import { useState } from "react";
import { FormFeedback, Input, InputGroup, InputGroupText, Label } from "reactstrap";
import { TextInputProps } from "../../Types";
import { FieldHookConfig, useField } from "formik";

export default function TextInput({ label, children, name, autoComplete = "off", type = "text", required, inputGroupIcon, ...props }: TextInputProps) {
  const { validate, ...inputProps } = props;
  const fieldConfig: FieldHookConfig<string> = { name, validate };
  const [field, meta] = useField(fieldConfig);

  const isPassword = type === "password";
  const [show, setShow] = useState(false);
  const toggleVisibility = () => setShow((prev) => !prev);

  const inputType = isPassword ? (show ? "text" : "password") : type;

  const formGroupContent = (
    <div className={`input-box ${type === "password" ? "position-relative" : ""}`}>
      {label && (
        <Label for={props.id || name}>
          {label}
          {required && <span className="required ps-1">*</span>}
        </Label>
      )}
      {inputGroupIcon ? (
        <InputGroup>
          <InputGroupText className="list-light-primary">{inputGroupIcon}</InputGroupText>
          <Input {...field} {...inputProps} value={field.value ?? ""} autoComplete={autoComplete} type={inputType} placeholder={props.placeholder ? props.placeholder : undefined} invalid={meta.touched && !!meta.error} />
        </InputGroup>
      ) : (
        <Input {...field} {...inputProps} value={field.value ?? ""} autoComplete={autoComplete} type={inputType} placeholder={props.placeholder ? props.placeholder : undefined} invalid={meta.touched && !!meta.error} />
      )}
      {meta.touched && meta.error ? <FormFeedback>{meta.error}</FormFeedback> : null}

      {isPassword && (
        <div className="show-hide" onClick={toggleVisibility} style={{ cursor: "pointer" }}>
          <span className={!show ? "show" : ""} />
        </div>
      )}

      {children}
    </div>
  );

  return formGroupContent;
}
