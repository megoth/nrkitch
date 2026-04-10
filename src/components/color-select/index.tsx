import { type FC, useCallback } from "react";
import useAccount from "~/hooks/account";

const ColorSelect: FC = () => {
  const { color: userColor, changeColor } = useAccount();

  const onChangeColor = useCallback(() => {
    const newColor = prompt("Farge", userColor);
    if (!newColor) return;
    changeColor(newColor);
  }, [userColor, changeColor]);

  return (
    <button className="button is-small" type="button" onClick={onChangeColor}>
      Endre farge
    </button>
  );
};

export default ColorSelect;
