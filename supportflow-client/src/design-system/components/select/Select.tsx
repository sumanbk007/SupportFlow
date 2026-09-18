import { Select as AntSelect } from "antd";
import type { SelectProps } from "antd";
import type { BaseOptionType, DefaultOptionType } from "antd/es/select";

export const Select = <
  ValueType = any,
  OptionType extends BaseOptionType | DefaultOptionType = DefaultOptionType,
>({
  allowClear = true,
  showSearch = true,
  optionFilterProp = "label",
  placeholder = "Select...",
  ...props
}: SelectProps<ValueType, OptionType>) => {
  return (
    <AntSelect<ValueType, OptionType>
      allowClear={allowClear}
      showSearch={showSearch}
      optionFilterProp={optionFilterProp}
      placeholder={placeholder}
      {...props}
    />
  );
};
