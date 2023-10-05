import { ButtonModel } from "@/models/ui/components.models";
import ButtonLoader from "./ButtonLoader";

function Button(props: ButtonModel) {
  const { value, type, onClick, background, classNameStyle, size, loading } =
    props;

  const btnSize = () => {
    if (size === "sm") return "25%";
    if (size === "md") return "50%";
    if (size === "lg") return "75%";
    if (size === "xl") return "100%";
  };

  return (
    <button
      className={`rounded-md ${classNameStyle} ${background} flex gap-x-3 justify-center pt-3`}
      style={{ width: `${btnSize()}` }}
      type={type}
      onClick={onClick}
    >
      {loading && (
        <ButtonLoader
          height="25px"
          width="25px"
          borderTopColor="#4582C4"
          borderTopWidth="2px"
          borderWidth="2px"
        />
      )}
      <>{value}</>
    </button>
  );
}

export default Button;