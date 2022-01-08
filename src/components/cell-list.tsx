import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
const CellList: React.FC = () => {
  const cells = useTypedSelector((state) => {
    if (state.cells) {
      return state.cells.order.map((id) => {
        if (state.cells) {
          return state.cells.data[id];
        }
      });
    }
  });
  if (cells) {
    const renderedCells = cells.map((cell) => (
      <CellListItem key={cell ? cell.id : null} cell={cell ? cell : null} />
    ));

    return <div>{renderedCells}</div>;
  }
  return <div></div>;
};

export default CellList;
