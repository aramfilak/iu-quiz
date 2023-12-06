import { Heading, CheckboxGroup, Checkbox } from '@chakra-ui/react';

interface CustomCheckboxGroupProps {
  labels: string[];
  propertyValues: string[];
  heading: string;
  disabled?: boolean;
  isMandatory: boolean;
  selectedCheckbox: string | undefined;
  handleCheckboxChange: (value: string | undefined) => void;
}

function CustomCheckboxGroup({
  labels,
  propertyValues,
  heading,
  disabled,
  isMandatory,
  selectedCheckbox,
  handleCheckboxChange
}: CustomCheckboxGroupProps): JSX.Element {
  const handleCheckboxClick = (value: string) => {
    if (selectedCheckbox === value) {
      if (!isMandatory) {
        handleCheckboxChange(undefined);
        return;
      }
      handleCheckboxChange(value);
    } else {
      handleCheckboxChange(value);
    }
  };

  return (
    <>
      <Heading mb="0.5rem" as="h3" fontSize="md">
        {heading}
      </Heading>
      <CheckboxGroup value={selectedCheckbox ? [selectedCheckbox] : []}>
        {labels.map((label, index) => (
          <Checkbox
            key={index}
            colorScheme="teal"
            borderColor="teal"
            px={1}
            value={propertyValues[index]}
            isChecked={selectedCheckbox === propertyValues[index]}
            onChange={() => handleCheckboxClick(propertyValues[index])}
            isDisabled={disabled}
          >
            {label}
          </Checkbox>
        ))}
      </CheckboxGroup>
    </>
  );
}

export default CustomCheckboxGroup;
