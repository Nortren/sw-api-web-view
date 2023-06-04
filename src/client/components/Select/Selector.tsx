import React, { FC } from 'react';
import { Select } from 'antd';

interface ISelector {
  className?: string;
  popupClassName?: string;
  defaultValue?: string;
  mode?: 'multiple' | 'tags' | undefined;
  onChange?: (value: string) => void;
  options?: any[];
  open?: boolean;
}

const Selector: FC<ISelector> = ({
  className,
  popupClassName,
  defaultValue,
  mode,
  onChange,
  options,
  open,
}) => {
  return (
    <Select
      popupClassName={popupClassName}
      className={className}
      defaultValue={defaultValue}
      style={{ width: 120 }}
      onChange={onChange}
      options={options}
      mode={mode}
      open={open}
    />
  );
};

export default Selector;
