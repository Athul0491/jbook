import "./cell-list-item.css";
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
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell cell={cell} />
      </div>
    );
  } else if (cell && cell.type === "text") {
    child = (
      <div>
        <TextEditor cell={cell} />;
        <ActionBar id={cell.id} />
      </div>
    );
  }
  return <div className="cell-list-item">{child}</div>;
};

export default CellListItem;
