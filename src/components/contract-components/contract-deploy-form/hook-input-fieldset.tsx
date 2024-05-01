import { Box, Flex, Icon } from "@chakra-ui/react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { ExtensionInput } from "../contract-publish-form/extension-input";
import { FiPlus } from "react-icons/fi";
import { Button, Heading } from "tw-components";

interface HookInputFieldsetProps {
  form: UseFormReturn<any, any>;
  hookParamKey: string;
}

export const HookInputFieldset: React.FC<HookInputFieldsetProps> = ({
  form,
  //   hookParamKey,
}) => {
  const { fields, append, remove } = useFieldArray({
    name: "defaultExtensions",
    control: form.control,
  });
  return (
    <Flex pb={4} direction="column" gap={2}>
      <Heading size="label.lg">Default Extensions</Heading>

      <Flex flexDir="column" gap={2}>
        {fields.map((item, index) => (
          <ExtensionInput
            key={item.id}
            remove={remove}
            index={index}
            isModular={true}
          />
        ))}
        <Box>
          <Button
            type="button"
            size="sm"
            colorScheme="primary"
            borderRadius="md"
            leftIcon={<Icon as={FiPlus} />}
            onClick={() =>
              append({
                extensionName: "",
                extensionVersion: "",
                publisherAddress: "",
              })
            }
          >
            Add Extension
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};
