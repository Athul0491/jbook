import { Cell } from "../state";
import CodeCell from "./code-cell";
import TextEditor from "./text-editor";
import ActionBar from "./action-bar";
interface CellListItemProps {
  cell: Cell | null;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  child = <div></div>;
  if (cell && cell.type === "code") {
    child = (
      <div>
        <ActionBar id={cell.id} />
        <CodeCell cell={cell} />
      </div>
    );
  } else if (cell && cell.type === "text") {
    child = (
      <div>
        <ActionBar id={cell.id} />
        <TextEditor cell={cell} />;
      </div>
    );
  }
  return <div>{child}</div>;
};

export default CellListItem;
