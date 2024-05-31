import { cn } from "@/lib/utils";
import Select, { Props } from "react-select";

export default function ReactSelect<
  Option = unknown,
  IsMulti extends boolean = false
>({
  label,
  error,
  wrapperClass,
  ...props
}: Props<Option, IsMulti> & {
  label?: string;
  error?: string;
  wrapperClass?: string;
}) {
  return (
    <div className={cn(`flex flex-col`, wrapperClass)}>
      {label && (
        <label className="font-medium mb-1 text-foreground">{label}</label>
      )}
      <Select<Option, IsMulti>
        styles={{
          control: (base, state) => ({}),
          input: (base, state) => ({
            ...base,
            "input:focus": {
              boxShadow: "none",
            },
          }),
        }}
        classNames={{
          control: ({ isFocused }) => {
            if (error) {
              return cn(
                "flex py-1 rounded-md border border-destructive bg-background",
                isFocused ? "ring-[4px] ring-danger/30" : ""
              );
            }
            return cn(
              "flex py-1 rounded-md border bg-background",
              isFocused ? "border-primary" : "border-border"
            );
          },
          multiValue: ({}) => {
            return cn("dark:!bg-muted dark:text-muted-foreground");
          },
          multiValueLabel: ({}) => {
            return cn("dark:text-muted-foreground");
          },
          singleValue: ({}) => {
            return cn("!text-foreground");
          },
          menu: ({}) => {
            return cn("!bg-background dark:border");
          },
          option: ({isSelected}) => {
            if (isSelected) {
              return cn("!bg-primary !text-primary-foreground");
            }
            return cn("!bg-background hover:!bg-muted focus:!bg-muted text-foreground");
          },
        }}
        {...props}
      />
      {error && <div className="text-destructive text-sm mt-1.5">{error}</div>}
    </div>
  );
}
