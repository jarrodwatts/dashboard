import { Flex } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import React, { useMemo } from "react";
import {
  useConstructorParamsFromABI,
  useFunctionParamsFromABI,
} from "../hooks";

interface HookParamSelectorProps {
  deployParams:
    | ReturnType<typeof useFunctionParamsFromABI>
    | ReturnType<typeof useConstructorParamsFromABI>;
  defaultValue: string;
  value: string;
  onChange: (fn: string) => void;
}

export const HookParamSelector: React.FC<HookParamSelectorProps> = ({
  deployParams,
  value,
  defaultValue,
  onChange,
}) => {
  const options = useMemo(() => {
    return deployParams.map((f) => ({
      label: f.name,
      value: f.name,
    }));
  }, [deployParams]);

  return (
    <Flex gap={2} alignItems="center" w="full">
      <Select
        placeholder="Select param"
        options={options}
        defaultValue={options.find((o) => o.value === defaultValue)}
        chakraStyles={{
          container: (provided) => ({
            ...provided,
            width: "full",
          }),
        }}
        value={options.find((o) => o.value === value)}
        onChange={(selectedParam) => {
          if (selectedParam) {
            onChange((selectedParam as { label: string; value: string }).value);
          }
        }}
      />
    </Flex>
  );
};
