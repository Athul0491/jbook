import { Cell } from "../state";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";

interface CellListItemProps {
  cell: Cell | null;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  child = <div></div>;
  if (cell && cell.type === "code") {
    child = <CodeCell cell={cell} />;
  } else if (cell && cell.type === "text") {
    child = <TextEditor cell={cell} />;
  }
  return <div>{child}</div>;
};

export default CellListItem;
